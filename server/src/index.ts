require("module-alias/register");

import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";

const port = process.env.PORT || 3000;
const app = express();
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, async () => {
  console.log(`App listening at http://localhost:${port}`);
  connectDB();
});
