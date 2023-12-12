"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = exports.UserModel = void 0;
const user_models_1 = require("./user.models");
const post_models_1 = require("./post.models");
const typegoose_1 = require("@typegoose/typegoose");
exports.UserModel = (0, typegoose_1.getModelForClass)(user_models_1.User);
exports.PostModel = (0, typegoose_1.getModelForClass)(post_models_1.Post);
