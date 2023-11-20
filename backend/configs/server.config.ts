import cors, { CorsOptions } from "cors";
import debug from "debug";
import express, { Express } from "express";
import cookieParser from "cookie-parser";
import isError from "../middlewares/error.middleware";
const log = debug("backend:server");

const corsOptions: CorsOptions = {
  origin: process.env.CLIENT_ORIGIN || "http://localhost:4200",
  credentials: true,
};

export const configureServer = (app: Express, enableCors: boolean) => {
  if (enableCors) {
    log("CORS enabled");
    app.use(cors(corsOptions));
  }
  // express will parse incoming JSON requests
  app.use(express.json({ limit: "50mb" }));
  // express will accept and parse incoming url requests (responsible for body parsing)
  app.use(express.urlencoded({ limit: "50mb", extended: true }));
  app.use(cookieParser());
};
