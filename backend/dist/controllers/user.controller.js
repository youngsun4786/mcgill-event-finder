"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPinsController = exports.getUserController = void 0;
const models_1 = require("../models");
const user_service_1 = require("../services/user.service");
const getUserController = async (req, res) => {
    try {
        const users = await models_1.UserModel.find().select({ password: 0 }).exec();
        console.log(users);
        res.status(200).send(users);
    }
    catch (error) {
        console.error(error);
        res.status(500);
        throw new Error(error.message);
    }
};
exports.getUserController = getUserController;
const updateUserPinsController = async (req, res, next) => {
    try {
        const { email, pins } = req.body;
        const updated = await (0, user_service_1.updateUserPins)(email, pins);
        if (updated) {
            res.status(200).json("User pins array updated successfully");
        }
    }
    catch (error) {
        res.status(500).json(error.message);
        next(error);
    }
};
exports.updateUserPinsController = updateUserPinsController;
