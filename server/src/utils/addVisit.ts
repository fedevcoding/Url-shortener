import { prisma } from "@/config/db";
import { device } from "@prisma/client";

export const addVisit = async ({
  ipAddress,
  shortUrl,
  device,
  browser,
}: {
  ipAddress: string | undefined;
  shortUrl: string;
  device: device;
  browser?: string;
}) => {
  try {
    await prisma.views.create({
      data: {
        ip_address: ipAddress,
        short_url: shortUrl,
        browser,
        device,
      },
    });
  } catch (e) {
    console.log(e);
  }
};
