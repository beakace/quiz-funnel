import { v4 as uuidv4 } from "uuid";
import { LeadFormData, QuizAnswers } from "./types";

// Define the structure of a lead
export interface Lead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  quizId?: string;
  answers: Record<string, string>;
  submittedAt: string;
}

// Define the structure of API lead data
interface ApiLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  quizId?: string;
  createdAt: string;
  answers: Array<{
    questionId: string;
    optionId: string;
  }>;
}

/**
 * Save lead data to the API and localStorage as a fallback
 */
export async function saveLead(
  data: LeadFormData,
  answers: QuizAnswers,
  quizId?: string
): Promise<Lead> {
  // Format the answers for the API
  const formattedAnswers = Object.entries(answers).map(
    ([questionId, optionId]) => ({
      questionId,
      optionId,
    })
  );

  try {
    // Try to save to the API first
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        quizId: quizId || data.quizId,
        answers: formattedAnswers,
      }),
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const apiLead = await response.json();
    console.log("Lead saved to API:", apiLead);

    // Also save to localStorage as a backup
    const lead = saveLeadToLocalStorage(data, answers, quizId);
    return lead;
  } catch (error) {
    console.error(
      "Failed to save lead to API, falling back to localStorage:",
      error
    );
    // Fallback to localStorage
    return saveLeadToLocalStorage(data, answers, quizId);
  }
}

/**
 * Helper function to save lead data to localStorage
 */
function saveLeadToLocalStorage(
  data: LeadFormData,
  answers: QuizAnswers,
  quizId?: string
): Lead {
  // Create a new lead object
  const lead: Lead = {
    id: uuidv4(),
    name: data.name,
    email: data.email,
    phone: data.phone,
    quizId: quizId || data.quizId,
    answers,
    submittedAt: new Date().toISOString(),
  };

  // Get existing leads from localStorage
  const existingLeads = localStorage.getItem("leads");
  const leads = existingLeads ? JSON.parse(existingLeads) : [];

  // Add the new lead
  leads.push(lead);

  // Save back to localStorage
  localStorage.setItem("leads", JSON.stringify(leads));

  return lead;
}

/**
 * Get all leads from the API and localStorage
 */
export async function getLeads(): Promise<Lead[]> {
  try {
    // Try to get leads from the API
    const response = await fetch("/api/leads");

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const apiLeads: ApiLead[] = await response.json();

    // Format API leads to match the Lead interface
    const formattedApiLeads: Lead[] = apiLeads.map((apiLead) => {
      // Convert the array of answers to a Record
      const answersRecord: Record<string, string> = {};

      // Check if answers is an array before using forEach
      if (Array.isArray(apiLead.answers)) {
        apiLead.answers.forEach((answer) => {
          answersRecord[answer.questionId] = answer.optionId;
        });
      } else if (apiLead.answers && typeof apiLead.answers === "object") {
        // If answers is already an object/record, use it directly
        Object.assign(answersRecord, apiLead.answers);
      }

      return {
        id: apiLead.id,
        name: apiLead.name,
        email: apiLead.email,
        phone: apiLead.phone,
        quizId: apiLead.quizId,
        answers: answersRecord,
        submittedAt: apiLead.createdAt,
      };
    });

    console.log("Leads fetched from API:", formattedApiLeads);
    return formattedApiLeads;
  } catch (error) {
    console.error(
      "Failed to fetch leads from API, falling back to localStorage:",
      error
    );
    // Fallback to localStorage
    return getLeadsFromLocalStorage();
  }
}

/**
 * Get all leads from localStorage
 */
function getLeadsFromLocalStorage(): Lead[] {
  const leadsJson = localStorage.getItem("leads");
  if (!leadsJson) return [];

  try {
    return JSON.parse(leadsJson);
  } catch (error) {
    console.error("Error parsing leads from localStorage:", error);
    return [];
  }
}
