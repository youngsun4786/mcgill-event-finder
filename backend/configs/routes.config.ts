import { Express } from "express";
import { UserRouter } from "../routes";

export const configureRoutes = (app: Express) => {
  app.use("/users", UserRouter);
};

