import { prisma } from "@/config/db";

export const addVisit = async ({ ipAddress, shortUrl }: { ipAddress: string | undefined; shortUrl: string }) => {
  try {
    await prisma.views.create({
      data: {
        ip_address: ipAddress,
        short_url: shortUrl,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
