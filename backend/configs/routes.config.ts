import { Express } from "express";
import { UserRouter, AuthRouter } from "../routes";

export const configureRoutes = (app: Express) => {
  app.use("/users", UserRouter);
  app.use("/auth", AuthRouter);
};
