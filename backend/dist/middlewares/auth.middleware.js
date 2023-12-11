"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jwtCredentials_1 = require("../utils/jwtCredentials");
const UnauthorizedInvalidTokenException_1 = __importDefault(require("../exceptions/UnauthorizedInvalidTokenException"));
const UnauthorizedNoTokenException_1 = __importDefault(require("../exceptions/UnauthorizedNoTokenException"));
const isAuthenticated = (req, res, next) => {
    let token = "";
    if (req.session)
        token = req.session["token"];
    if (!token) {
        return next(new UnauthorizedNoTokenException_1.default());
    }
    try {
        const receivedUser = (0, jwtCredentials_1.verifyToken)(token);
        if (receivedUser) {
            req.user = receivedUser.user;
            next();
        }
        else {
            return next(new UnauthorizedInvalidTokenException_1.default());
        }
    }
    catch (error) {
        res.clearCookie("access_token");
        return next(new UnauthorizedInvalidTokenException_1.default());
    }
};
exports.isAuthenticated = isAuthenticated;
