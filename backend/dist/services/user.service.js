"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPins = void 0;
const models_1 = require("../models");
const updateUserPins = async (userEmail, pins) => {
    const user = await models_1.UserModel.findOneAndUpdate({ email: userEmail }, { pins: pins }).exec();
    if (!user)
        return false;
    return true;
};
exports.updateUserPins = updateUserPins;
