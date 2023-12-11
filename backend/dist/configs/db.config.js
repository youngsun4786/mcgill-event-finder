"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
dotenv_1.default.config();
const connectionUrl = process.env.DB_URL;
const dbName = process.env.DB_NAME || "myDbTest";
if (!connectionUrl) {
    console.error("Missing DB_URL environment variable");
    process.exit(1);
}
if (!dbName) {
    console.error("Missing DB_NAME environment variable");
    process.exit(1);
}
const connectToDatabase = async () => {
    try {
        mongoose_1.default.connect(`${connectionUrl}/${dbName}`, {
            writeConcern: { w: "majority" },
        });
        console.log("Successfully connected to MongoDB");
    }
    catch (error) {
        console.error("Successfully connected to MongoDB");
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
