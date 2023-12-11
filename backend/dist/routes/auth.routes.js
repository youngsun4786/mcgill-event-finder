"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("../controllers/auth.controller");
const schema_validator_1 = __importDefault(require("../middlewares/schema.validator"));
const auth_schema_1 = require("../models/schemas/auth.schema");
const router = (0, express_1.Router)();
router.post("/register", (0, schema_validator_1.default)(auth_schema_1.registerUserSchema), auth_controller_1.registerController);
router.post("/login", (0, schema_validator_1.default)(auth_schema_1.loginUserSchema), auth_controller_1.loginController);
router.post("/logout", auth_controller_1.logoutController);
exports.default = router;
