require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();

import useragent from "express-useragent";
import requestIp from "request-ip";
import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { useRoutes } from "./routes/useRoutes";
import { CLIENT_URL } from "./constants";

const port = process.env.PORT || 3000;
const app = express();

app.use(cors({ origin: "*" }));
app.use(requestIp.mw());
app.set("trust proxy", true);
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true }));
app.use(useragent.express());

app.get("/", (_, res) => {
  res.redirect(CLIENT_URL);
});

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
  connectDB();
  useRoutes(app);
});
