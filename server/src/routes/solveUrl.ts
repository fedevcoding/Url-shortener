import { prisma } from "@/config/db";
import express from "express";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { url } = req.query;

    // validate with zod
    const prismaRes = await prisma.urls.findUnique({
      where: {
        short_url: url as string,
      },
      select: {
        url: true,
      },
    });
    if (!prismaRes) throw new Error("URL not found");
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
