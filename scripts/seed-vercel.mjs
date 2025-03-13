// This script is used to seed the database on Vercel during deployment
import { execSync } from "child_process";

try {
  console.log("Running Prisma seed on Vercel...");

  // Generate Prisma client
  execSync("npx prisma generate", { stdio: "inherit" });

  // Push schema to database
  execSync("npx prisma db push", { stdio: "inherit" });

  // Run the seed script
  execSync("npx prisma db seed", { stdio: "inherit" });

  console.log("Seed completed successfully on Vercel!");
} catch (error) {
  console.error("Error running seed on Vercel:", error);
  process.exit(1);
}
