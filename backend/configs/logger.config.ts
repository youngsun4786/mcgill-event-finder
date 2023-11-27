import logger from "pino";
import config from "config";

const level = "info";

export const log = logger({
  transport: {
    target: "pino-pretty",
  },
  level,
  base: { pid: false },
  timestamp: () => `,"time":"${Date.now().toFixed(0)}"`,
});

export default log;
