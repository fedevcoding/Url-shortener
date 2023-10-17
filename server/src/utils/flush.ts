import { prisma } from "@/config/db";

export const flushAll = async () => {
  await prisma.urls.deleteMany();
  await prisma.views.deleteMany();
  console.log("Flushed all URLs");
};
