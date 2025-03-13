import { PrismaClient } from "@prisma/client";

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Maximum number of retries for database connections
const MAX_RETRIES = 3;

// Create a new PrismaClient instance with connection handling
function createPrismaClient() {
  const client = new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

  // Add middleware for connection error handling
  client.$use(async (params, next) => {
    let retries = 0;

    while (retries < MAX_RETRIES) {
      try {
        return await next(params);
      } catch (error) {
        // Only retry on connection errors
        if (
          error instanceof Error &&
          (error.message.includes("Can't reach database server") ||
            error.message.includes("Connection refused") ||
            error.message.includes("Connection terminated unexpectedly"))
        ) {
          retries++;
          console.warn(
            `Database connection error, retrying (${retries}/${MAX_RETRIES})...`
          );
          // Wait before retrying (exponential backoff)
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * Math.pow(2, retries - 1))
          );
        } else {
          throw error;
        }
      }
    }

    // If we've exhausted retries, throw the error
    throw new Error(
      `Failed to connect to database after ${MAX_RETRIES} retries`
    );
  });

  return client;
}

export const prisma = globalForPrisma.prisma || createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

// Helper function to check database connection
export async function checkDatabaseConnection() {
  try {
    // Simple query to check connection
    await prisma.$queryRaw`SELECT 1`;
    return { connected: true, error: null };
  } catch (error) {
    console.error("Database connection check failed:", error);
    return {
      connected: false,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
