import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log("Database connected");
  } catch (error) {
    console.log("Database connection failed");
  }
};
