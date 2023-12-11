import dotenv from "dotenv";
import mongoose, { ConnectOptions } from "mongoose";

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
      writeConcern: { w: "majority" },
    } as ConnectOptions);
    console.log("Successfully connected to MongoDB");
    // log.info("Successfully connected to MongoDB");
  } catch (error: any) {
    console.error("Successfully connected to MongoDB");
    // log.error(error, "Could not connect to MongoDB");
    process.exit(1);
  }
};
