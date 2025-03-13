import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

// Define types for our in-memory storage
interface InMemoryLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  quizId: string;
  score?: number;
  answers: Array<{
    questionId: string;
    optionId: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

// In-memory storage as a fallback when database is not available
const inMemoryLeads: InMemoryLead[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, quizId, score, answers } = body;

    // Validate required fields
    if (!name || !email || !quizId) {
      return NextResponse.json(
        { error: "Name, email, and quizId are required" },
        { status: 400 }
      );
    }

    try {
      // Try to use Prisma first
      const lead = await prisma.lead.create({
        data: {
          name,
          email,
          phone,
          quizId,
          score,
          // Create answers if provided
          ...(answers && answers.length > 0
            ? {
                answers: {
                  create: answers.map(
                    (answer: { questionId: string; optionId: string }) => ({
                      questionId: answer.questionId,
                      optionId: answer.optionId,
                    })
                  ),
                },
              }
            : {}),
        },
      });

      return NextResponse.json({ success: true, lead }, { status: 201 });
    } catch (dbError) {
      console.error("Database error, using in-memory storage:", dbError);

      // Fallback to in-memory storage
      const newLead: InMemoryLead = {
        id: uuidv4(),
        name,
        email,
        phone,
        quizId,
        score,
        answers: answers || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      inMemoryLeads.push(newLead);

      return NextResponse.json(
        { success: true, lead: newLead, storage: "in-memory" },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Failed to create lead" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const quizId = searchParams.get("quizId");

    try {
      // Try to use Prisma first
      const leads = quizId
        ? await prisma.lead.findMany({
            where: { quizId },
            orderBy: { createdAt: "desc" },
            include: {
              answers: {
                include: {
                  question: true,
                  option: true,
                },
              },
            },
          })
        : await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            include: {
              answers: {
                include: {
                  question: true,
                  option: true,
                },
              },
            },
          });

      return NextResponse.json(leads);
    } catch (dbError) {
      console.error("Database error, using in-memory storage:", dbError);

      // Fallback to in-memory storage
      let filteredLeads = inMemoryLeads;
      if (quizId) {
        filteredLeads = inMemoryLeads.filter((lead) => lead.quizId === quizId);
      }

      return NextResponse.json(filteredLeads, {
        headers: { "X-Storage-Type": "in-memory" },
      });
    }
  } catch (error) {
    console.error("Error fetching leads:", error);
    return NextResponse.json(
      { error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
