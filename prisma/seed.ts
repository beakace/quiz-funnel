import { PrismaClient } from "@prisma/client";
import { rentalQuiz } from "../src/lib/quiz-data";

const prisma = new PrismaClient();

async function main() {
  console.log("Starting seed...");

  // Create a default user for the quiz
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      password: "hashed_password_placeholder", // In a real app, you'd hash this
      role: "ADMIN",
    },
  });

  console.log("Created user:", user.id);

  // Create the rental optimization quiz
  const quiz = await prisma.quiz.upsert({
    where: { slug: "rental-optimization" },
    update: {
      title: "Optymalizacja Wynajmu",
      description: "Quiz pomagający zoptymalizować wynajem nieruchomości",
      published: true,
    },
    create: {
      id: "rental-optimization", // Use the same ID as in the code
      slug: "rental-optimization",
      title: "Optymalizacja Wynajmu",
      description: "Quiz pomagający zoptymalizować wynajem nieruchomości",
      published: true,
      userId: user.id,
    },
  });

  console.log("Created quiz:", quiz.id);

  // Create questions from the rental quiz data
  for (const question of rentalQuiz.questions) {
    const createdQuestion = await prisma.question.upsert({
      where: { id: question.id },
      update: {
        text: question.question,
        order: rentalQuiz.questions.indexOf(question),
      },
      create: {
        id: question.id,
        quizId: quiz.id,
        text: question.question,
        order: rentalQuiz.questions.indexOf(question),
      },
    });

    console.log("Created question:", createdQuestion.id);

    // Create options for each question
    for (const option of question.options) {
      const createdOption = await prisma.option.upsert({
        where: { id: option.id },
        update: {
          text: option.text,
        },
        create: {
          id: option.id,
          questionId: createdQuestion.id,
          text: option.text,
        },
      });

      console.log("Created option:", createdOption.id);
    }
  }

  console.log("Seed completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
