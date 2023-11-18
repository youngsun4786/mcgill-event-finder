import express, { Express, Request, Response } from "express";
import { connectToDatabase } from "./configs/db.config";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

// express will parse incoming JSON requests
app.use(express.json({ limit: "50mb" }));

// express will accept and parse incoming url requests
app.use(express.urlencoded({ limit: "50mb", extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Hello World!" });
});

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server running at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });
