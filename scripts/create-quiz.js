// CommonJS script to create quiz data
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Creating quiz data...");

  // Create a default user
  const user = await prisma.user.upsert({
    where: { email: "admin@example.com" },
    update: {},
    create: {
      email: "admin@example.com",
      name: "Admin User",
      role: "ADMIN",
    },
  });

  console.log("Created user:", user.id);

  // Create the quiz
  const quiz = await prisma.quiz.upsert({
    where: { slug: "rental-optimization" },
    update: {
      title: "Optymalizacja Wynajmu",
      description: "Quiz pomagający zoptymalizować wynajem nieruchomości",
      published: true,
    },
    create: {
      id: "rental-optimization",
      slug: "rental-optimization",
      title: "Optymalizacja Wynajmu",
      description: "Quiz pomagający zoptymalizować wynajem nieruchomości",
      published: true,
      userId: user.id,
    },
  });

  console.log("Created quiz:", quiz.id);

  // Create some basic questions
  const questions = [
    {
      id: "property_count",
      text: "Ile apartamentów na wynajem posiadasz?",
      order: 0,
    },
    {
      id: "property_location",
      text: "Gdzie znajduje się Twoja nieruchomość?",
      order: 1,
    },
    {
      id: "time_spent",
      text: "Ile czasu tygodniowo poświęcasz na zarządzanie wynajmem?",
      order: 2,
    },
  ];

  // Create questions
  for (const question of questions) {
    const createdQuestion = await prisma.question.upsert({
      where: { id: question.id },
      update: {
        text: question.text,
        order: question.order,
      },
      create: {
        id: question.id,
        quizId: quiz.id,
        text: question.text,
        order: question.order,
      },
    });

    console.log("Created question:", createdQuestion.id);

    // Create some basic options for each question
    const options = [
      { id: `${question.id}_option1`, text: "Option 1" },
      { id: `${question.id}_option2`, text: "Option 2" },
      { id: `${question.id}_option3`, text: "Option 3" },
    ];

    // Create options
    for (const option of options) {
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

  console.log("Quiz data created successfully!");
}

main()
  .catch((e) => {
    console.error("Error creating quiz data:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
