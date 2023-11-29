import { Express, Request, Response, NextFunction } from "express";
import { UserRouter, AuthRouter, PostRouter } from "../routes";

export const configureRoutes = (app: Express) => {
  app.use(function (req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", req.headers.origin);
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use("/users", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/posts", PostRouter);
};
