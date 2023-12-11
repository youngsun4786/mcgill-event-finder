import cors, { CorsOptions } from "cors";
import express, { Express } from "express";
// import log from "./logger.config";

const corsOptions: CorsOptions = {
  origin: "https://mcgill-event-finder-frontend-youngsun4786.vercel.app/",
  credentials: true,
};

export const configureServer = (app: Express, enableCors: boolean) => {
  if (enableCors) {
    // log.info("CORS enabled");
    app.use(cors(corsOptions));
  }
  // express will parse incoming JSON requests
  app.use(express.json({ limit: "50mb" }));
  // express will accept and parse incoming url requests (responsible for body parsing)
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  // app.use(cookieParser());
};
