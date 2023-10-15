import { prisma } from "@/config/db";
import express from "express";

const router = express.Router();

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
    });

    res.json({ views: prismaRes.length });
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});

export default router;
