"use client";

import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Cog,
  MessageSquare,
  CheckCircle,
  Sparkles,
  Settings,
} from "lucide-react";

const agentData = [
  {
    id: 1,
    name: "Nancy",
    role: "Natural Language Processing Specialist",
    description: "Transforms communication into actionable insights",
    icon: MessageSquare,
    specialty: "NLP",
  },
  {
    id: 2,
    name: "Ellis",
    role: "Predictive Analytics Expert",
    description: "Forecasts trends before they happen",
    icon: TrendingUp,
    specialty: "Analytics",
  },
  {
    id: 3,
    name: "Justin",
    role: "Intelligent Automation Architect",
    description: "Streamlines workflows with surgical precision",
    icon: Cog,
    specialty: "Automation",
  },
  {
    id: 4,
    name: "Dan",
    role: "Social Media Strategist",
    description: "Amplifies your brand voice across all channels",
    icon: MessageSquare,
    specialty: "Social",
  },
  {
    id: 5,
    name: "Chloe",
    role: "Project Operations Manager",
    description: "Keeps everything running like clockwork",
    icon: CheckCircle,
    specialty: "Operations",
  },
];

 const AIAgentsSection = () => {
  const [selectedAgent, setSelectedAgent] = useState(agentData[0]);

  return (
    <section className="py-20 bg-agent-background px-6 md:px-12 lg:px-20 w-full border-t border-border relative z-10">
      <div className="w-full">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Your Specialized AI Agents
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Every agent comes with an intuitive dashboard to fine-tune, train, and optimize performance.
          </p>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
          {agentData.map((agent) => {
            const IconComponent = agent.icon;
            return (
              <Card
                key={agent.id}
                onClick={() => setSelectedAgent(agent)}
                className={`group p-8 cursor-pointer border-agent-border hover:shadow-agent transition-all duration-300 hover:-translate-y-2 relative overflow-hidden bg-white text-black dark:bg-zinc-800 dark:text-white ${
                  selectedAgent.id === agent.id ? "ring-2 ring-primary" : ""
                }`}
              >
                <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {agent.specialty}
                    </Badge>
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{agent.name}</h3>
                  <p className="text-sm font-medium mb-3 text-blue-500">{agent.role}</p>
                  <p className="text-muted-foreground text-sm leading-relaxed">{agent.description}</p>
                </div>
              </Card>
            );
          })}

          {/* Custom Agent Card */}
          <Card className="group p-8 bg-white text-black dark:bg-zinc-800 dark:text-white border-none hover:shadow-glow transition-all duration-300 hover:-translate-y-2 relative overflow-hidden">
            <div className="relative z-10 text-center">
              <div className="p-3 rounded-full bg-white/20 mx-auto mb-4 w-fit">
                <Sparkles className="w-6 h-6 text-black dark:text-white" />
              </div>
              <h3 className="text-2xl font-bold text-black dark:text-white mb-2">Your Custom Agent</h3>
              <p className="text-black dark:text-white text-sm font-medium mb-3">Built Just for You</p>
              <p className="text-black dark:text-white text-sm leading-relaxed mb-6">
                {`We'll`} create the exact AI agent your business needs
              </p>
            </div>
          </Card>
        </div>

        {/* AI Control Dashboard Section */}
        <div className="max-w-4xl mx-auto p-8 bg-zinc-100 dark:bg-zinc-800 rounded-2xl border border-gray-200 dark:border-zinc-700 shadow-md text-center">
          <Settings className="mx-auto text-indigo-500 dark:text-indigo-400" size={48} />
          <h4 className="text-2xl font-semibold text-black dark:text-white mt-4">{selectedAgent.name}'s Dashboard</h4>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Fine-tune and monitor: <span className="font-medium text-indigo-600 dark:text-indigo-400">{selectedAgent.role}</span>
          </p>
          <p className="text-sm text-muted-foreground mt-1">{selectedAgent.description}</p>
        </div>
      </div>
    </section>
  );
};

export default AIAgentsSection; 