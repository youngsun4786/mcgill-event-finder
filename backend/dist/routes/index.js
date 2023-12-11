"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRouter = exports.AuthRouter = exports.UserRouter = void 0;
var user_routes_1 = require("./user.routes");
Object.defineProperty(exports, "UserRouter", { enumerable: true, get: function () { return __importDefault(user_routes_1).default; } });
var auth_routes_1 = require("./auth.routes");
Object.defineProperty(exports, "AuthRouter", { enumerable: true, get: function () { return __importDefault(auth_routes_1).default; } });
var post_routes_1 = require("./post.routes");
Object.defineProperty(exports, "PostRouter", { enumerable: true, get: function () { return __importDefault(post_routes_1).default; } });
