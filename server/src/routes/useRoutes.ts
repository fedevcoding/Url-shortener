import { type Express } from "express";

import newUrlRoute from "./newUrl";
import solveUrlRoute from "./solveUrl";

export const useRoutes = (app: Express) => {
  app.use(`/solveUrl`, solveUrlRoute);
  app.use(`/create`, newUrlRoute);
};
