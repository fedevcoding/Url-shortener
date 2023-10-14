import { prisma } from "@/config/db";
import { addVisit } from "@/utils/addVisit";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { url } = req.query as { url: string };

    if (!url) throw new Error("No URL provided");

    const prismaRes = await prisma.urls.findUnique({
      where: {
        short_url: url,
      },
      select: {
        url: true,
      },
    });

    if (!prismaRes) throw new Error("URL not found");
    addVisit({
      ipAddress: req.clientIp,
      shortUrl: url,
    });

    const { url: resolvedUrl } = prismaRes;

    res.json({ resolvedUrl });
  } catch (e) {
    console.log(e);
    if (e instanceof Error) {
      res.status(500).send(e.message);
    }
  }
});

export default router;
