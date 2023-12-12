import cors, { CorsOptions } from "cors";
import express, { Express } from "express";

const corsOptions: CorsOptions = {
  origin: ["https://mcevent.netlify.app", "http://localhost:4200"],
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
};
