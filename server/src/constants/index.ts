import { getEnv } from "@/utils";
import { rateLimit } from "express-rate-limit";

export const CLIENT_URL = getEnv("CLIENT_URL");
export const CLIENT_NAME = getEnv("CLIENT_NAME");

export const LIMITER = rateLimit({
  windowMs: 1 * 30 * 1000,
  limit: 15,
  keyGenerator: function (req) {
    return req.clientIp || req.ip;
  },
});
