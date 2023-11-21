import express, { Express } from "express";
import { configureRoutes, configureServer, connectToDatabase } from "./configs";
import dotenv from "dotenv";
import { configureSession } from "./configs/session.config";
import { errorHandler } from "./middlewares/error.middleware";
import log from "./configs/logger.config";

dotenv.config();
const app: Express = express();

const port = process.env.PORT || 8000;

// * connect to express server after connecting to the database
connectToDatabase()
  .then(() => {
    // * middleware
    configureServer(app, true);
    configureSession(app);
    // * error handling

    app.use(errorHandler);
    // * set routes
    configureRoutes(app);

    // * start server
    app.listen(port, () => {
      log.info(`[server]: Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
