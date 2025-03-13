import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";
import { sendResultsEmail } from "@/lib/email";

// Define types for our in-memory storage
interface InMemoryLead {
  id: string;
  name: string;
  email: string;
  phone?: string;
  quizId: string;
  score?: number;
  resultId?: string;
  sendResultsViaEmail?: boolean;
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
    const {
      name,
      email,
      phone,
      quizId,
      score,
      resultId,
      sendResultsViaEmail,
      answers,
    } = body;

    // Validate required fields
    if (!name || !email || !quizId) {
      return NextResponse.json(
        { error: "Name, email, and quizId are required" },
        { status: 400 }
      );
    }

    try {
      // Check if the quiz exists, if not create it
      const quiz = await prisma.quiz.findUnique({
        where: { id: quizId },
      });

      if (!quiz) {
        // Create a default user if none exists
        let user = await prisma.user.findFirst();

        if (!user) {
          user = await prisma.user.create({
            data: {
              email: "admin@example.com",
              name: "Admin User",
              role: "USER",
            },
          });
        }

        // Create the quiz
        await prisma.quiz.create({
          data: {
            id: quizId,
            slug: quizId,
            title:
              quizId === "rental-optimization"
                ? "Optymalizacja Wynajmu"
                : quizId,
            description: "Quiz created automatically",
            published: true,
            userId: user.id,
          },
        });
      }

      // Try to use Prisma to create the lead and answers
      try {
        // First create the lead
        const lead = await prisma.lead.create({
          data: {
            name,
            email,
            phone,
            quizId,
            score,
            resultId,
          },
        });

        // Then create the answers if provided
        if (answers && answers.length > 0) {
          // Create answers one by one to handle potential errors
          for (const answer of answers) {
            try {
              await prisma.answer.create({
                data: {
                  leadId: lead.id,
                  questionId: answer.questionId,
                  optionId: answer.optionId,
                },
              });
            } catch (answerError) {
              console.error(`Error creating answer: ${answerError}`);
              // Continue with other answers even if one fails
            }
          }
        }

        // Fetch the lead with its answers
        const leadWithAnswers = await prisma.lead.findUnique({
          where: { id: lead.id },
          include: {
            answers: true,
          },
        });

        // Send email with quiz results if requested
        if (sendResultsViaEmail && email) {
          try {
            // Prepare lead data for email sending
            const leadForEmail = {
              id: lead.id,
              name,
              email,
              phone,
              quizId,
              answers: answers.reduce(
                (
                  acc: Record<string, string>,
                  answer: { questionId: string; optionId: string }
                ) => {
                  acc[answer.questionId] = answer.optionId;
                  return acc;
                },
                {}
              ),
              submittedAt: new Date().toISOString(),
              score,
              resultId,
              sendResultsViaEmail,
            };

            await sendResultsEmail(leadForEmail);
            console.log(`Results email sent to ${email}`);
          } catch (emailError) {
            console.error("Error sending results email:", emailError);
            // Continue even if email sending fails
          }
        }

        return NextResponse.json(
          { success: true, lead: leadWithAnswers },
          { status: 201 }
        );
      } catch (createError) {
        console.error("Error creating lead or answers:", createError);
        throw createError; // Re-throw to be caught by the outer try-catch
      }
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
        resultId,
        sendResultsViaEmail,
        answers: answers || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      inMemoryLeads.push(newLead);

      // Send email with quiz results if requested (in-memory fallback)
      if (sendResultsViaEmail && email) {
        try {
          // Prepare lead data for email sending
          const leadForEmail = {
            id: newLead.id,
            name,
            email,
            phone,
            quizId,
            answers: answers.reduce(
              (
                acc: Record<string, string>,
                answer: { questionId: string; optionId: string }
              ) => {
                acc[answer.questionId] = answer.optionId;
                return acc;
              },
              {}
            ),
            submittedAt: new Date().toISOString(),
            score,
            resultId,
            sendResultsViaEmail,
          };

          await sendResultsEmail(leadForEmail);
          console.log(`Results email sent to ${email} (in-memory fallback)`);
        } catch (emailError) {
          console.error(
            "Error sending results email (in-memory fallback):",
            emailError
          );
          // Continue even if email sending fails
        }
      }

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
              answers: true,
            },
          })
        : await prisma.lead.findMany({
            orderBy: { createdAt: "desc" },
            include: {
              answers: true,
            },
          });

      // Format the leads to match the expected structure
      const formattedLeads = leads.map((lead) => {
        // Convert the answers array to the expected format
        const answersRecord = lead.answers.reduce((acc, answer) => {
          acc[answer.questionId] = answer.optionId;
          return acc;
        }, {} as Record<string, string>);

        return {
          ...lead,
          answers: answersRecord,
        };
      });

      return NextResponse.json(formattedLeads);
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
