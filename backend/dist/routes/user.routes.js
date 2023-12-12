"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_validator_1 = __importDefault(require("../middlewares/schema.validator"));
const user_schema_1 = require("../models/schemas/user.schema");
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
router.put("/", [auth_middleware_1.isAuthenticated, (0, schema_validator_1.default)(user_schema_1.updateUserPinsSchema)], user_controller_1.updateUserPinsController);
exports.default = router;
