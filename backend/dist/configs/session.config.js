"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureSession = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_session_1 = __importDefault(require("cookie-session"));
dotenv_1.default.config();
const cookieEnv = process.env.COOKIE_SECRET;
if (!cookieEnv) {
    console.error("Missing COOKIE_SECRET environment variable");
}
const configureSession = (app) => {
    app.use((0, cookie_session_1.default)({
        name: "event-finder-session",
        keys: [cookieEnv || "cookie-secret"],
        httpOnly: process.env.NODE_ENV === "development",
    }));
};
exports.configureSession = configureSession;
