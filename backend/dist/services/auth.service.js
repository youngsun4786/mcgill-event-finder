"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const models_1 = require("../models");
const omit = require("just-omit");
const jwtCredentials_1 = require("../utils/jwtCredentials");
const UserAlreadyExistsException_1 = __importDefault(require("../exceptions/UserAlreadyExistsException"));
const register = async (input) => {
    try {
        const user = new models_1.UserModel(input);
        await user.save();
        return omit(user.toJSON(), "password");
    }
    catch (error) {
        throw new UserAlreadyExistsException_1.default();
    }
};
exports.register = register;
const login = async (userEmail, userPassword) => {
    const user = await models_1.UserModel.findOne({ email: userEmail }).exec();
    if (!user)
        return false;
    const validPassword = await (0, jwtCredentials_1.comparePassword)(user.password, userPassword);
    if (!validPassword)
        return false;
    return omit(user.toJSON(), "password");
};
exports.login = login;
