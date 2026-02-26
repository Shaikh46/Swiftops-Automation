import { Bot, MessageSquare, Mail, Workflow, Globe, Smartphone, LucideIcon } from 'lucide-react';

export interface ServiceData {
  id: string;
  title: string;
  description: string;
  detailedDescription: string;
  features: string[];
  icon: LucideIcon;
  image: string;
}

export const servicesData: ServiceData[] = [
  {
    id: 'ai-agents',
    title: 'AI Agents',
    description: 'Intelligent autonomous agents that handle complex tasks and decision-making.',
    detailedDescription:
      'Intelligent autonomous AI agents designed to analyze data, make decisions, automate workflows, and execute complex business operations without constant human supervision.',
    features: [
      'Autonomous decision-making',
      'Task automation',
      'API & system integrations',
      'Real-time analytics processing',
      'Multi-step workflow execution',
    ],
    icon: Bot,
    image: '/assets/generated/icon-ai-agents.dim_128x128.png',
  },
  {
    id: 'ai-chatbots',
    title: 'AI Chatbots',
    description: 'Conversational AI that engages customers 24/7 with human-like interactions.',
    detailedDescription:
      'Advanced conversational AI systems that interact naturally with customers, provide instant responses, and improve engagement across websites and platforms.',
    features: [
      'Human-like conversations',
      '24/7 customer support',
      'Lead qualification',
      'Multi-language capability',
      'CRM integration',
    ],
    icon: MessageSquare,
    image: '/assets/generated/icon-chatbots.dim_128x128.png',
  },
  {
    id: 'email-automation',
    title: 'Email Automation',
    description: 'Smart email workflows that nurture leads and drive conversions automatically.',
    detailedDescription:
      'Smart automated email systems that nurture leads, personalize communication, and increase conversion rates through intelligent workflows.',
    features: [
      'Automated campaigns',
      'Behavioral triggers',
      'Personalized messaging',
      'Analytics tracking',
      'Funnel automation',
    ],
    icon: Mail,
    image: '/assets/generated/icon-email-automation.dim_128x128.png',
  },
  {
    id: 'workflow-automation',
    title: 'Workflow Automation',
    description: 'Streamline operations with intelligent process automation across your stack.',
    detailedDescription:
      'Streamline business operations using intelligent automation that connects apps, services, and processes into seamless workflows.',
    features: [
      'Process automation',
      'Cross-platform integration',
      'Task orchestration',
      'Data synchronization',
      'Performance monitoring',
    ],
    icon: Workflow,
    image: '/assets/generated/icon-workflow-automation.dim_128x128.png',
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Modern, responsive websites built with cutting-edge technologies.',
    detailedDescription:
      'Modern, fast, and responsive websites engineered with scalable architecture and premium UI/UX standards.',
    features: [
      'Responsive design',
      'SEO optimization',
      'High performance',
      'Secure architecture',
      'Modern frameworks',
    ],
    icon: Globe,
    image: '/assets/generated/icon-web-dev.dim_128x128.png',
  },
  {
    id: 'app-development',
    title: 'App Development',
    description: 'Native and cross-platform mobile applications that scale with your business.',
    detailedDescription:
      'Scalable native and cross-platform mobile applications designed for performance, usability, and business growth.',
    features: [
      'Android & iOS apps',
      'Cross-platform solutions',
      'Cloud integration',
      'Secure backend',
      'Scalable architecture',
    ],
    icon: Smartphone,
    image: '/assets/generated/icon-app-dev.dim_128x128.png',
  },
];
