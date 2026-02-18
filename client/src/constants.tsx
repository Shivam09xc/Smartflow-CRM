
import { Lead, LeadStatus, Deal, DealStage, Task } from './types';

export const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Alex Rivera', email: 'alex.rivera@globaltech.com', phone: '+1 (555) 012-3456', company: 'Global Tech Solutions', source: 'LinkedIn', status: LeadStatus.NEW, assignedTo: 'Sarah Jenkins', createdAt: '2024-03-20', value: 85000 },
  { id: '2', name: 'Jordan Smith', email: 'j.smith@cloudmetrics.io', phone: '+1 (555) 987-6543', company: 'Cloud Metrics Inc.', source: 'Referral', status: LeadStatus.IN_PROGRESS, assignedTo: 'Marcus Thorne', createdAt: '2024-03-18', value: 120000 },
  { id: '3', name: 'Lara Croft', email: 'lara@archeosystems.com', phone: '+44 20 7946 0958', company: 'Archeo Systems', source: 'Cold Outreach', status: LeadStatus.CONVERTED, assignedTo: 'Sarah Jenkins', createdAt: '2024-03-15', value: 45000 },
  { id: '4', name: 'Bruce Wayne', email: 'bruce@wayne.com', phone: '+1 (555) 777-8888', company: 'Wayne Enterprises', source: 'Google Ads', status: LeadStatus.LOST, assignedTo: 'Harvey Dent', createdAt: '2024-03-10', value: 250000 },
];

export const MOCK_DEALS: Deal[] = [
  { id: '1', title: 'Cloud Infrastructure Upgrade', company: 'Global Tech Solutions', value: 85000, stage: DealStage.PROSPECT, probability: 20, expectedClose: '2024-12-15' },
  { id: '2', title: 'CRM Migration Phase 2', company: 'NexGen Retail', value: 250000, stage: DealStage.QUALIFIED, probability: 40, expectedClose: '2024-11-20' },
  { id: '3', title: 'Enterprise Security Suite', company: 'Shield Cyber', value: 420000, stage: DealStage.PROPOSAL, probability: 60, expectedClose: '2024-10-30' },
  { id: '4', title: 'Global Logistics AI', company: 'TransWorld Corp', value: 315000, stage: DealStage.NEGOTIATION, probability: 85, expectedClose: '2024-09-15' },
  { id: '5', title: 'Digital Transformation', company: 'Acme Industries', value: 180000, stage: DealStage.WON, probability: 100, expectedClose: '2024-08-01' },
];

export const MOCK_TASKS: Task[] = [
  { id: '1', title: 'Review Q4 Revenue Projections', priority: 'High', relatedEntity: 'Global Logistics Deal', dueDate: 'Today, 5:00 PM', status: 'In Progress' },
  { id: '2', title: 'Follow up on contract signature', priority: 'Medium', relatedEntity: 'Sarah Jenkins', dueDate: 'Tomorrow', status: 'To Do' },
  { id: '3', title: 'Send introduction email', priority: 'Low', relatedEntity: 'Mike Ross', dueDate: 'Aug 24, 2024', status: 'Completed' },
  { id: '4', title: 'Prepare demo for steering committee', priority: 'High', relatedEntity: 'Enterprise Upgrade Deal', dueDate: 'Aug 28, 2024', status: 'Waiting' },
];
