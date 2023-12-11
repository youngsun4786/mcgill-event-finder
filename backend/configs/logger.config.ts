import logger from "pino";
import dotenv from "dotenv";
import pretty from "pino-pretty";

dotenv.config();

const stream = pretty({
  levelFirst: true,
  colorize: true,
  ignore: "time,hostname,pid",
});

const level = process.env.NODE_ENV === "production" ? "info" : "debug";

export const log = logger({
  name: "McEvent",
  level,
  stream,
  base: { pid: false },
  timestamp: () => `,"time":"${Date.now().toFixed(0)}"`,
});

export default log;
