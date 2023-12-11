"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const configs_1 = require("./configs");
const dotenv_1 = __importDefault(require("dotenv"));
const session_config_1 = require("./configs/session.config");
const error_middleware_1 = require("./middlewares/error.middleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
(0, configs_1.configureServer)(app, true);
app.use(error_middleware_1.errorHandler);
(0, configs_1.connectToDatabase)().then(() => {
    (0, session_config_1.configureSession)(app);
    (0, configs_1.configureRoutes)(app);
    app.get("/", (req, res) => {
        res.send("Hello World!");
    });
    app.listen(port, () => {
        console.log(`[server]: Server running at http://localhost:${port}`);
    });
});
