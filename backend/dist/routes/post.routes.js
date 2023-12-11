"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const post_schema_1 = require("../models/schemas/post.schema");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const schema_validator_1 = __importDefault(require("../middlewares/schema.validator"));
const router = (0, express_1.Router)();
router.get("/", auth_middleware_1.isAuthenticated, post_controller_1.getPostsController);
router.post("/", [auth_middleware_1.isAuthenticated, (0, schema_validator_1.default)(post_schema_1.createPostSchema)], post_controller_1.createPostController);
router.delete("/:postId", [auth_middleware_1.isAuthenticated, (0, schema_validator_1.default)(post_schema_1.deletePostSchema)], post_controller_1.deletePostController);
router.put("/:postId", [auth_middleware_1.isAuthenticated, (0, schema_validator_1.default)(post_schema_1.updatePostSchema)], post_controller_1.updatePostController);
exports.default = router;
