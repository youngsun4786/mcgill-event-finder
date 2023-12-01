import { Express } from "express";
import dotenv from "dotenv";
import cookieSession from "cookie-session";

dotenv.config();

const cookieEnv = process.env.COOKIE_SECRET;
if (!cookieEnv) {
  console.error("Missing COOKIE_SECRET environment variable");
}

export const configureSession = (app: Express) => {
  app.set("trust proxy", 1); // trust first proxy
  app.use(
    cookieSession({
      name: "event-finder-session",
      keys: [cookieEnv || "cookie-secret"],
      httpOnly: process.env.NODE_ENV === "development",
    })
  );
};
