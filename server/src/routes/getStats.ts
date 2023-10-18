import { prisma } from "@/config/db";
import express from "express";
import { lookup } from "geoip-lite";

const router = express.Router();

type statsActivity = {
  country: string | null;
  city: string | null;
  date: string;
}[];

type statsChart = Record<
  string,
  {
    name: string;
    y: number;
  }
>[];

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

    const totalClicks = prismaRes.length;

    let mobileClicks = 0;
    let pcClicks = 0;
    const browsers: Map<string, number> = new Map();
    const countries: Map<string, number> = new Map();

    const activity: statsActivity = prismaRes.map(view => {
      if (view.created > thirtyDaysAgo) {
        thirtyDaysClicks++;
        if (view.created > sevenDaysAgo) {
          sevenDaysClicks++;
          if (view.created > oneDayAgo) {
            oneDayClicks++;
          }
        }
      }

      const { created, ip_address } = view;
      const geo = lookup(ip_address ?? "");

      if (view.device === "mobile") {
        mobileClicks++;
      } else {
        pcClicks++;
      }

      const browser = view.browser ?? "unknown";
      if (browsers.has(browser)) {
        browsers.set(browser, (browsers.get(browser) ?? 0) + 1);
      } else {
        browsers.set(browser, 1);
      }

      const country = geo?.country ?? "unknown";
      if (countries.has(country)) {
        countries.set(country, (countries.get(country) ?? 0) + 1);
      } else {
        countries.set(country, 1);
      }

      return {
        country: geo?.country ?? null,
        city: geo?.city ?? null,
        date: created.toString(),
        ipAddress: ip_address ?? null,
        browser: view.browser ?? null,
        device: view.device ?? null,
      };
    });

    res.json({
      totalClicks,
      thirtyDaysClicks,
      sevenDaysClicks,
      oneDayClicks,
      activity,
      mobileClicks,
      pcClicks,
      browsers: [...browsers],
      countries: [...countries],
    });
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});

export default router;
