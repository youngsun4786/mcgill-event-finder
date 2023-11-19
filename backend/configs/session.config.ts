import { Express } from "express";
import debug from "debug";

const log = debug("backend:session");

const cookieSession = process.env.COOKIE_SECRET;

export const configureSession = (app: Express) => {};
