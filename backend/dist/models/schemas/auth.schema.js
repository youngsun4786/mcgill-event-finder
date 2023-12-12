"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.registerUserSchema = void 0;
const zod_1 = require("zod");
const post_schema_1 = require("./post.schema");
const user_models_1 = require("../user.models");
exports.registerUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({ required_error: "Name is required" }).trim(),
        email: (0, zod_1.string)({ required_error: "Email is required" })
            .trim()
            .email("Not a valid email"),
        password: (0, zod_1.string)({ required_error: "Password is required" })
            .trim()
            .min(8, "Password must be at least 8 characters."),
        passwordConfirmation: (0, zod_1.string)({
            required_error: "Password confirmation is required",
        }).trim(),
        role: (0, zod_1.nativeEnum)(user_models_1.UserType, { required_error: "Role is required" }),
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),
});
exports.registerUserSchema.extend({ pins: (0, zod_1.array)(post_schema_1.createPostSchema).optional() });
exports.loginUserSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        })
            .trim()
            .email("Invalid email or password"),
        password: (0, zod_1.string)({
            required_error: "Password is required",
        })
            .trim()
            .min(8, "Invalid email or password"),
    }),
});
