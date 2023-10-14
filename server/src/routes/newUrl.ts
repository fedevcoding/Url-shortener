import { prisma } from "@/config/db";
import express from "express";
import shortid from "shortid";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let { longUrl } = req.body as { longUrl: string };
    if (!longUrl) throw new Error("No URL provided");

    longUrl = longUrl.startsWith("http://") || longUrl.startsWith("https://") ? longUrl : `https://${longUrl}`;

    const prismaRes = await prisma.urls.create({
      data: {
        short_url: shortid.generate(),
        url: longUrl,
      },
    });

    res.json({ url: prismaRes.url, shortUrl: prismaRes.short_url });
  } catch (e) {
    console.log(e);

    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});

export default router;
