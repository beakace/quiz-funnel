import { NextResponse } from "next/server";
import { prisma, checkDatabaseConnection } from "@/lib/db";

export async function GET() {
  try {
    // Check database connection
    const connectionStatus = await checkDatabaseConnection();

    if (!connectionStatus.connected) {
      return NextResponse.json(
        {
          success: false,
          message: "Database connection failed",
          error: connectionStatus.error,
          databaseUrl: process.env.DATABASE_URL
            ? process.env.DATABASE_URL.replace(
                /\/\/([^:]+):[^@]+@/,
                "//***:***@"
              ) // Hide credentials
            : "Not configured",
          environment: process.env.NODE_ENV || "unknown",
          timestamp: new Date().toISOString(),
        },
        { status: 500 }
      );
    }

    // Try to connect to the database and get counts
    const leadCount = await prisma.lead.count();
    const quizCount = await prisma.quiz.count();
    const questionCount = await prisma.question.count();
    const optionCount = await prisma.option.count();
    const userCount = await prisma.user.count();

    return NextResponse.json({
      success: true,
      message: "Database connection successful",
      counts: {
        leads: leadCount,
        quizzes: quizCount,
        questions: questionCount,
        options: optionCount,
        users: userCount,
      },
      environment: process.env.NODE_ENV || "unknown",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Database connection error",
        error: error instanceof Error ? error.message : String(error),
        databaseUrl: process.env.DATABASE_URL
          ? process.env.DATABASE_URL.replace(/\/\/([^:]+):[^@]+@/, "//***:***@") // Hide credentials
          : "Not configured",
        environment: process.env.NODE_ENV || "unknown",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
