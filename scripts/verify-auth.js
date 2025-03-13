const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  console.log("🔍 Verifying authentication system...");

  try {
    // 1. Check database connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Database connection: SUCCESS");
    } catch (error) {
      console.error("❌ Database connection: FAILED");
      console.error(error);
      process.exit(1);
    }

    // 2. Check if admin users exist
    const adminCount = await prisma.user.count({
      where: {
        role: "ADMIN",
      },
    });

    if (adminCount > 0) {
      console.log(`✅ Admin users: ${adminCount} found`);
    } else {
      console.warn("⚠️ No admin users found. You should create one with:");
      console.warn("npm run create-admin admin@example.com your-password");
    }

    // 3. Check environment variables
    if (!process.env.NEXTAUTH_SECRET) {
      console.error("❌ NEXTAUTH_SECRET is not set");
    } else {
      console.log("✅ NEXTAUTH_SECRET: Set");
    }

    if (!process.env.NEXTAUTH_URL) {
      console.warn(
        "⚠️ NEXTAUTH_URL is not set. This is required in non-Vercel environments"
      );
    } else {
      console.log(`✅ NEXTAUTH_URL: ${process.env.NEXTAUTH_URL}`);
    }

    // 4. Check database schema
    try {
      // Check if the User table has the required fields
      const user = await prisma.user.findFirst({
        select: {
          id: true,
          email: true,
          password: true,
          role: true,
        },
      });

      console.log("✅ Database schema: User table looks good");
    } catch (error) {
      console.error("❌ Database schema issue detected:");
      console.error(error);
    }

    console.log("\n🔒 Authentication system verification complete");
  } catch (error) {
    console.error("Error during verification:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
