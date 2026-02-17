
export enum LeadStatus {
  NEW = 'New',
  IN_PROGRESS = 'In Progress',
  QUALIFIED = 'Qualified',
  CONVERTED = 'Converted',
  LOST = 'Lost'
}

export enum DealStage {
  PROSPECT = 'Prospect',
  QUALIFIED = 'Qualified',
  PROPOSAL = 'Proposal',
  NEGOTIATION = 'Negotiation',
  WON = 'Won',
  LOST = 'Lost'
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  source: string;
  status: LeadStatus;
  assignedTo: string;
  createdAt: string;
  value: number;
}

export interface Deal {
  id: string;
  title: string;
  company: string;
  value: number;
  stage: DealStage;
  probability: number;
  expectedClose: string;
}

export interface Task {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  relatedEntity: string;
  dueDate: string;
  status: 'In Progress' | 'To Do' | 'Completed' | 'Waiting';
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  team: string;
  manager: string;
  status: 'Active' | 'Inactive';
  avatar?: string;
}
