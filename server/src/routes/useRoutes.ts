import { type Express } from "express";

import newUrlRoute from "./newUrl";
import solveUrlRoute from "./solveUrl";
import statsRoute from "./getStats";

export const useRoutes = (app: Express) => {
  app.use(`/solveUrl`, solveUrlRoute);
  app.use(`/create`, newUrlRoute);
  app.use(`/stats`, statsRoute);
};
