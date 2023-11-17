import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

const port = process.env.PORT || 8000;

// express will parse incoming JSON requests
app.use(express.json());

// express will accept and parse incoming url requests
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TS server");
});

app.listen(port, () => {
  console.log(`[server]: Server running at http://localhost:${port}`);
});
