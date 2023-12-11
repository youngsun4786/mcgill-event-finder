import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";
import log from "./logger.config";

dotenv.config();

const connectionUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME || "myDbTest";

// exit the process if there is no connection string to MongoDB
if (!connectionUrl) {
  console.error("Missing DB_URL environment variable");
  process.exit(1);
}

// exit the process if there is no database name variable
if (!dbName) {
  console.error("Missing DB_NAME environment variable");
  process.exit(1);
}

export const connectToDatabase = async () => {
  try {
    mongoose.connect(`${connectionUrl}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      writeConcern: { w: "majority" },
    } as ConnectOptions);
    log.info("Successfully connected to MongoDB");
  } catch (error: any) {
    log.error(error, "Could not connect to MongoDB");
    process.exit(1);
  }
};
