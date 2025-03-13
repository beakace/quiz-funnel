import { LeadFormData } from "./types";

export interface Lead extends LeadFormData {
  id: string;
  createdAt: string;
  answers: Record<string, string>;
}

const LEADS_STORAGE_KEY = "quiz_leads";

export function saveLead(
  data: LeadFormData,
  answers: Record<string, string>
): Lead {
  const leads = getLeads();

  const newLead: Lead = {
    ...data,
    id: generateId(),
    createdAt: new Date().toISOString(),
    answers,
  };

  leads.push(newLead);
  localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));

  return newLead;
}

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return [];

  const storedLeads = localStorage.getItem(LEADS_STORAGE_KEY);
  if (!storedLeads) return [];

  try {
    return JSON.parse(storedLeads);
  } catch (error) {
    console.error("Error parsing leads:", error);
    return [];
  }
}

function generateId(): string {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
}
