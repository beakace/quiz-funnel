const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

async function main() {
  const email = process.argv[2];
  const password = process.argv[3];

  if (!email || !password) {
    console.error("Usage: node scripts/create-admin.js <email> <password>");
    process.exit(1);
  }

  console.log("\n🔐 ADMIN USER SETUP 🔐");
  console.log("====================");
  console.log(`Email: ${email}`);
  console.log(
    `Password: ${password.substring(0, 2)}${"*".repeat(
      password.length - 4
    )}${password.substring(password.length - 2)}`
  );
  console.log("====================\n");

  try {
    // Check database connection first
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log("✅ Database connection successful");
    } catch (error) {
      console.error("❌ Database connection failed:", error);
      process.exit(1);
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log(
        `👤 User with email ${email} already exists. Updating password...`
      );

      const hashedPassword = await bcrypt.hash(password, 10);

      await prisma.user.update({
        where: { email },
        data: {
          password: hashedPassword,
        },
      });

      console.log("✅ Password updated successfully!");

      // Log the admin credentials for deployment
      if (process.env.NODE_ENV === "production") {
        console.log("\n🚀 DEPLOYMENT: ADMIN CREDENTIALS UPDATED 🚀");
        console.log(`Email: ${email}`);
        console.log(
          `Password: ${password.substring(0, 2)}${"*".repeat(
            password.length - 4
          )}${password.substring(password.length - 2)}`
        );
        console.log("Save these credentials securely!\n");
      }
    } else {
      // Create new user
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          email,
          name: "Admin User",
          password: hashedPassword,
          role: "ADMIN",
        },
      });

      console.log(`✅ Admin user created successfully with ID: ${user.id}`);

      // Log the admin credentials for deployment
      if (process.env.NODE_ENV === "production") {
        console.log("\n🚀 DEPLOYMENT: NEW ADMIN CREATED 🚀");
        console.log(`Email: ${email}`);
        console.log(
          `Password: ${password.substring(0, 2)}${"*".repeat(
            password.length - 4
          )}${password.substring(password.length - 2)}`
        );
        console.log("Save these credentials securely!\n");
      }
    }
  } catch (error) {
    console.error("❌ Error creating/updating admin user:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
