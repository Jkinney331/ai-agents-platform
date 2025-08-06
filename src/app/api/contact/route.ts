import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import nodemailer from 'nodemailer';
import fs from 'fs/promises';
import path from 'path';
import { ContactFormData, ContactSubmission, ContactFormResponse, RateLimitData } from '@/types/contact';

// Validation schema using Zod
const ContactFormSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100, 'Name is too long'),
  email: z.string().email('Invalid email format').max(200, 'Email is too long'),
  company: z.string().max(100, 'Company name is too long').optional(),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message is too long'),
});

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;

// File paths for data storage
const DATA_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'contact-submissions.json');
const RATE_LIMIT_FILE = path.join(DATA_DIR, 'rate-limits.json');

// Ensure data directory exists
async function ensureDataDir(): Promise<void> {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Rate limiting functions
async function checkRateLimit(ip: string): Promise<boolean> {
  await ensureDataDir();
  
  try {
    const rateLimitData = await fs.readFile(RATE_LIMIT_FILE, 'utf-8');
    const rateLimits: RateLimitData[] = JSON.parse(rateLimitData);
    
    const now = Date.now();
    const userLimit = rateLimits.find(limit => limit.ip === ip);
    
    if (!userLimit) {
      return true; // First request from this IP
    }
    
    if (now > userLimit.resetTime) {
      return true; // Rate limit window has expired
    }
    
    return userLimit.count < RATE_LIMIT_MAX_REQUESTS;
  } catch {
    return true; // No rate limit file exists yet
  }
}

async function updateRateLimit(ip: string): Promise<void> {
  await ensureDataDir();
  
  let rateLimits: RateLimitData[] = [];
  
  try {
    const rateLimitData = await fs.readFile(RATE_LIMIT_FILE, 'utf-8');
    rateLimits = JSON.parse(rateLimitData);
  } catch {
    // File doesn't exist, start with empty array
  }
  
  const now = Date.now();
  const existingLimitIndex = rateLimits.findIndex(limit => limit.ip === ip);
  
  if (existingLimitIndex >= 0) {
    const existingLimit = rateLimits[existingLimitIndex];
    if (now > existingLimit.resetTime) {
      // Reset the rate limit
      rateLimits[existingLimitIndex] = {
        ip,
        count: 1,
        resetTime: now + RATE_LIMIT_WINDOW,
      };
    } else {
      // Increment the count
      rateLimits[existingLimitIndex].count++;
    }
  } else {
    // New IP
    rateLimits.push({
      ip,
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
  }
  
  // Clean up old rate limit entries
  rateLimits = rateLimits.filter(limit => now <= limit.resetTime);
  
  await fs.writeFile(RATE_LIMIT_FILE, JSON.stringify(rateLimits, null, 2));
}

// Data persistence functions
async function saveSubmission(submission: ContactSubmission): Promise<void> {
  await ensureDataDir();
  
  let submissions: ContactSubmission[] = [];
  
  try {
    const submissionsData = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    submissions = JSON.parse(submissionsData);
  } catch {
    // File doesn't exist, start with empty array
  }
  
  submissions.push(submission);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
}

// Email functions
async function createEmailTransporter() {
  const emailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  };

  if (!emailConfig.auth.user || !emailConfig.auth.pass) {
    throw new Error('Email configuration is missing');
  }

  return nodemailer.createTransporter(emailConfig);
}

async function sendConfirmationEmail(submission: ContactSubmission): Promise<void> {
  const transporter = await createEmailTransporter();
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: submission.email,
    subject: 'Thank you for contacting us',
    html: `
      <h2>Thank you for your message!</h2>
      <p>Hi ${submission.name},</p>
      <p>We've received your message and will get back to you within 24 hours.</p>
      <p><strong>Your message:</strong></p>
      <p>${submission.message.replace(/\n/g, '<br>')}</p>
      <br>
      <p>Best regards,<br>The Team</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

async function sendAdminNotification(submission: ContactSubmission): Promise<void> {
  const transporter = await createEmailTransporter();
  const adminEmail = process.env.ADMIN_EMAIL || process.env.SMTP_USER;
  
  const mailOptions = {
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: adminEmail,
    subject: `New Contact Form Submission from ${submission.name}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${submission.name}</p>
      <p><strong>Email:</strong> ${submission.email}</p>
      <p><strong>Company:</strong> ${submission.company || 'Not provided'}</p>
      <p><strong>Message:</strong></p>
      <p>${submission.message.replace(/\n/g, '<br>')}</p>
      <br>
      <p><strong>Submission Details:</strong></p>
      <p>ID: ${submission.id}</p>
      <p>Timestamp: ${submission.timestamp}</p>
      <p>IP: ${submission.ip || 'Unknown'}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}

// Helper function to get client IP
function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for');
  const real = request.headers.get('x-real-ip');
  
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  if (real) {
    return real.trim();
  }
  
  return 'unknown';
}

// Main POST handler
export async function POST(request: NextRequest): Promise<NextResponse<ContactFormResponse>> {
  try {
    // Get client IP for rate limiting
    const clientIp = getClientIp(request);
    
    // Check rate limit
    const isAllowed = await checkRateLimit(clientIp);
    if (!isAllowed) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }
    
    // Parse and validate request body
    const body = await request.json();
    const validatedData = ContactFormSchema.parse(body);
    
    // Create submission object
    const submission: ContactSubmission = {
      id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      ip: clientIp,
      userAgent: request.headers.get('user-agent') || undefined,
      ...validatedData,
    };
    
    // Save submission to file
    await saveSubmission(submission);
    
    // Update rate limit
    await updateRateLimit(clientIp);
    
    // Send emails (don't fail the request if emails fail)
    try {
      await Promise.all([
        sendConfirmationEmail(submission),
        sendAdminNotification(submission),
      ]);
    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Continue without failing the request
    }
    
    return NextResponse.json({
      success: true,
      message: 'Thank you for your message. We will get back to you soon!',
      submissionId: submission.id,
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: `Validation error: ${error.errors.map(e => e.message).join(', ')}`,
        },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred while processing your request. Please try again.',
      },
      { status: 500 }
    );
  }
}

// Handle other HTTP methods
export async function GET(): Promise<NextResponse> {
  return NextResponse.json(
    { message: 'Method not allowed' },
    { status: 405 }
  );
}