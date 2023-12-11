import express, { Express } from "express";
import { configureRoutes, configureServer, connectToDatabase } from "./configs";
import dotenv from "dotenv";
import { configureSession } from "./configs/session.config";
import { errorHandler } from "./middlewares/error.middleware";
import { PostModel, UserModel } from "./models";
import { posts, users } from "./data/data";
dotenv.config();
const app: Express = express();

const port = process.env.PORT || 8000;

// * middleware
configureServer(app, true);
app.use(errorHandler);

// * connect to express server after connecting to the database
connectToDatabase().then(() => {
  // * error handling
  configureSession(app);
  // * set routes
  configureRoutes(app);

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  // * start server
  app.listen(port, () => {
    console.log(`[server]: Server running at http://localhost:${port}`);

    // ! Run ONLY once
    // PostModel.bulkSave(posts);
    // UserModel.bulkSave(users);
  });
});
