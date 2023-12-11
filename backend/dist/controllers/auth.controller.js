"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutController = exports.loginController = exports.registerController = void 0;
const jwtCredentials_1 = require("../utils/jwtCredentials");
const UserAlreadyExistsException_1 = __importDefault(require("../exceptions/UserAlreadyExistsException"));
const InvalidCrendentialsException_1 = __importDefault(require("../exceptions/InvalidCrendentialsException"));
const auth_service_1 = require("../services/auth.service");
const registerController = async (req, res, next) => {
    const body = req.body;
    try {
        const newUser = await (0, auth_service_1.register)(body);
        if (newUser) {
            res.status(201).json({ message: "User created successfully" });
            return;
        }
    }
    catch (error) {
        if (error.code === 11000) {
            return next(new UserAlreadyExistsException_1.default());
        }
        res.status(500).json(error.message);
        return next(error);
    }
};
exports.registerController = registerController;
const loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await (0, auth_service_1.login)(email, password);
        if (!user) {
            next(new InvalidCrendentialsException_1.default());
        }
        const userData = {
            name: user.name,
            email: user.email,
            role: user.role,
            pins: user.pins,
        };
        const token = (0, jwtCredentials_1.generateToken)(res, { user: userData });
        if (req.session)
            req.session.token = token;
        res.send({
            accessToken: token,
            user: userData,
        });
        res.status(200);
    }
    catch (error) {
        next(error);
    }
};
exports.loginController = loginController;
const logoutController = async (req, res, next) => {
    try {
        res.clearCookie("token", { httpOnly: false, expires: new Date(0) });
        res.status(201).json({ message: "Logout successful" });
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.logoutController = logoutController;
