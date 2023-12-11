"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServer = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const logger_config_1 = __importDefault(require("./logger.config"));
const corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:4200",
    credentials: true,
};
const configureServer = (app, enableCors) => {
    if (enableCors) {
        logger_config_1.default.info("CORS enabled");
        app.use((0, cors_1.default)(corsOptions));
    }
    app.use(express_1.default.json({ limit: "50mb" }));
    app.use(express_1.default.urlencoded({ limit: "50mb", extended: true }));
};
exports.configureServer = configureServer;
