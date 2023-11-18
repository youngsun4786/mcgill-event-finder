import express, { Express, Request, Response } from "express";
import debug from "debug";
import { connectToDatabase } from "./configs/db.config";
import { configureRoutes, configureServer } from "./configs";
import dotenv from "dotenv";

dotenv.config();
const app: Express = express();

const log = debug("backend:entry");

const port = process.env.PORT || 8000;

// * connect to express server after connecting to the database
connectToDatabase()
  .then(() => {
    // * middleware
    configureServer(app, true);
    // * set routes
    configureRoutes(app);

    // * start server
    app.listen(port, () => {
      log(`[server]: Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
