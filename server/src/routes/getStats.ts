import { prisma } from "@/config/db";
import express from "express";
import { lookup } from "geoip-lite";

const router = express.Router();

type statsActivity = {
  country: string | null;
  city: string | null;
  date: string;
}[];

router.get("/:shortUrl", async (req, res) => {
  try {
    let { shortUrl } = req.params as { shortUrl: string };
    if (!shortUrl) throw new Error("No URL provided");

    const urlData = await prisma.urls.findUnique({
      where: {
        short_url: shortUrl,
      },
    });
    if (!urlData) throw new Error("Url not found");

    const prismaRes = await prisma.views.findMany({
      where: {
        short_url: shortUrl,
      },
      orderBy: {
        created: "desc",
      },
      take: 500,
    });

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const oneDayAgo = new Date();
    oneDayAgo.setDate(oneDayAgo.getDate() - 1);

    let thirtyDaysClicks = 0;
    let sevenDaysClicks = 0;
    let oneDayClicks = 0;

    prismaRes.forEach(view => {
      if (view.created > thirtyDaysAgo) {
        thirtyDaysClicks++;
        if (view.created > sevenDaysAgo) {
          sevenDaysClicks++;
          if (view.created > oneDayAgo) {
            oneDayClicks++;
          }
        }
      }
    });

    const totalClicks = prismaRes.length;

    const activity: statsActivity = prismaRes.map(view => {
      const { created, ip_address } = view;
      const geo = lookup(ip_address ?? "");

      return {
        country: geo?.country ?? null,
        city: geo?.city ?? null,
        date: created.toString(),
        ipAddress: ip_address ?? null,
        browser: view.browser ?? null,
        device: view.device ?? null,
      };
    });

    res.json({ totalClicks, thirtyDaysClicks, sevenDaysClicks, oneDayClicks, activity });
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});

export default router;
