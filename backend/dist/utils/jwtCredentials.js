"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.generateRefreshToken = exports.generateToken = exports.comparePassword = exports.securePassword = void 0;
const bcrypt_1 = require("bcrypt");
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const jwtEnv = process.env.JWT_SECRET;
const jwtRefreshEnv = process.env.REFRESH_JWT_SECRET;
if (!jwtEnv) {
    console.error("Missing JWT_SECRET environment variable");
    process.exit(1);
}
if (!jwtRefreshEnv) {
    console.error("Missing JWT_REFRESH_SECRET environment variable");
    process.exit(1);
}
const securePassword = async (password) => {
    const salt = await (0, bcrypt_1.genSalt)(10);
    const securedPassword = (0, bcrypt_1.hashSync)(password, salt);
    return securedPassword;
};
exports.securePassword = securePassword;
const comparePassword = async (hashedPassword, password) => {
    try {
        return (0, bcrypt_1.compareSync)(password, hashedPassword);
    }
    catch (error) {
        return false;
    }
};
exports.comparePassword = comparePassword;
const generateToken = (res, payload) => {
    const token = jsonwebtoken_1.default.sign(payload, jwtEnv, {
        expiresIn: "1h",
        allowInsecureKeySizes: true,
        algorithm: "HS256",
    });
    return token;
};
exports.generateToken = generateToken;
const generateRefreshToken = (res, payload) => {
    const token = jsonwebtoken_1.default.sign(payload, jwtRefreshEnv, {
        expiresIn: "1d",
        allowInsecureKeySizes: true,
        algorithm: "HS256",
    });
    return token;
};
exports.generateRefreshToken = generateRefreshToken;
const verifyToken = (token) => {
    return jsonwebtoken_1.default.verify(token, jwtEnv);
};
exports.verifyToken = verifyToken;
