import { prisma } from "@/config/db";

export const flushAll = async () => {
  await prisma.urls.deleteMany();
  console.log("Flushed all URLs");
};
