import express, { Express } from "express";
import debug from "debug";
import { configureRoutes, configureServer, connectToDatabase } from "./configs";
import dotenv from "dotenv";
import { configureSession } from "./configs/session.config";
import isError from "./middlewares/error.middleware";

dotenv.config();
const app: Express = express();

const log = debug("backend:entry");

const port = process.env.PORT || 8000;

// * connect to express server after connecting to the database
connectToDatabase()
  .then(() => {
    // * middleware
    configureServer(app, true);
    configureSession(app);
    // * error handling
    app.use(isError);
    // * set routes
    configureRoutes(app);

    // * start server
    app.listen(port, () => {
      console.log(`[server]: Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
