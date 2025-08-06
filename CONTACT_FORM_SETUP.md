# Contact Form Backend Implementation

## Overview

A complete contact form backend system has been implemented for your Next.js application with the following features:

- **API Endpoint**: `/api/contact` handles form submissions
- **Data Persistence**: File-based JSON storage for submissions
- **Email Notifications**: Automatic confirmation and admin notifications
- **Rate Limiting**: 5 requests per 15-minute window per IP
- **Input Validation**: Server-side validation using Zod
- **TypeScript Support**: Fully typed interfaces

## Architecture

```
src/
├── app/api/contact/
│   └── route.ts              # API endpoint handling
├── components/sections/
│   └── contact-section.tsx   # Contact form UI component
├── types/
│   └── contact.ts           # TypeScript interfaces
└── data/                    # Created automatically
    ├── contact-submissions.json
    └── rate-limits.json
```

## Environment Variables Setup

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Configure your email settings in `.env.local`:
   ```env
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=your-email@gmail.com
   SMTP_PASSWORD=your-app-password
   SMTP_FROM=your-email@gmail.com
   ADMIN_EMAIL=admin@yourcompany.com
   ```

### Email Provider Setup

#### Gmail Setup:
1. Enable 2-factor authentication on your Google account
2. Generate an App Password: https://support.google.com/accounts/answer/185833
3. Use the App Password in `SMTP_PASSWORD` (not your regular password)

#### Other Providers:
- **Outlook/Hotmail**: Use `smtp-mail.outlook.com`, port 587
- **Custom SMTP**: Contact your hosting provider for SMTP settings

## Database Schema

Contact submissions are stored as JSON with the following structure:

```typescript
interface ContactSubmission {
  id: string;              // Unique identifier
  timestamp: string;       // ISO timestamp
  name: string;           // User's name
  email: string;          // User's email
  company?: string;       // Optional company name
  message: string;        // User's message
  ip?: string;           // Client IP address
  userAgent?: string;    // Client user agent
}
```

## Rate Limiting

- **Limit**: 5 submissions per 15-minute window per IP address
- **Storage**: File-based tracking in `data/rate-limits.json`
- **Response**: HTTP 429 when limit exceeded

## Email Templates

### User Confirmation Email:
- Subject: "Thank you for contacting us"
- Contains: User's message confirmation and response timeline

### Admin Notification Email:
- Subject: "New Contact Form Submission from [Name]"
- Contains: All submission details including metadata

## API Endpoint Details

### POST `/api/contact`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp",
  "message": "Hello, I'm interested in your services."
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Thank you for your message. We will get back to you soon!",
  "submissionId": "contact_1234567890_abcd1234"
}
```

**Error Response (400/429/500):**
```json
{
  "success": false,
  "message": "Error description"
}
```

## Data Storage

Submissions are stored in `/data/contact-submissions.json`:
- **Format**: JSON array of ContactSubmission objects
- **Persistence**: File-based, created automatically
- **Backup**: Consider implementing regular backups for production

## Security Features

1. **Input Validation**: Zod schema validation on all inputs
2. **Rate Limiting**: IP-based request throttling
3. **Sanitization**: Automatic escaping in email templates
4. **Error Handling**: No sensitive information leaked in errors

## Production Considerations

1. **Email Service**: Consider using a service like SendGrid, Mailgun, or AWS SES for production
2. **Database**: Migrate to a proper database (PostgreSQL, MySQL) for better scalability
3. **File Storage**: Implement backup strategy for JSON files
4. **Monitoring**: Add logging and monitoring for form submissions
5. **SPAM Protection**: Consider adding CAPTCHA or more sophisticated spam detection

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Navigate to your site and find the contact form above the FAQ section

3. Test form submission with valid and invalid data

4. Check email delivery (both confirmation and admin notification)

5. Verify rate limiting by submitting multiple forms quickly

## File Locations

- **API Route**: `/Users/greenmachine2.0/ftp-ai-1/src/app/api/contact/route.ts`
- **Contact Component**: `/Users/greenmachine2.0/ftp-ai-1/src/components/sections/contact-section.tsx`
- **Types**: `/Users/greenmachine2.0/ftp-ai-1/src/types/contact.ts`
- **Main Page**: `/Users/greenmachine2.0/ftp-ai-1/src/app/page.tsx`

The contact form is now fully functional and positioned above the FAQ section as requested.