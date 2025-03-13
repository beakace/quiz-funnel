// Script to run the seed with ts-node
const { execSync } = require("child_process");

try {
  console.log("Running Prisma seed...");
  execSync(
    'npx ts-node --compiler-options {"module":"CommonJS"} prisma/seed.ts',
    { stdio: "inherit" }
  );
  console.log("Seed completed successfully!");
} catch (error) {
  console.error("Error running seed:", error);
  process.exit(1);
}
