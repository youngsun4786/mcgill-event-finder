"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostSchema = exports.updatePostSchema = exports.createPostSchema = void 0;
const zod_1 = require("zod");
const post_models_1 = require("../post.models");
const postSchema = {
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({ required_error: "Email is required" })
            .trim()
            .email("Not a valid email"),
        title: (0, zod_1.string)({
            required_error: "Title is required",
        }),
        tags: (0, zod_1.array)((0, zod_1.string)()).optional(),
        location: (0, zod_1.string)({
            required_error: "Location is required",
        }),
        startDate: (0, zod_1.string)({
            required_error: "Start Date is required",
        }),
        endDate: (0, zod_1.string)({
            required_error: "End Date is required",
        }),
        status: (0, zod_1.nativeEnum)(post_models_1.EventStatusType, {
            required_error: "Event Status is Required",
        }),
        description: (0, zod_1.string)().optional(),
    }),
};
const paramsSchema = {
    params: (0, zod_1.object)({
        postId: (0, zod_1.string)({
            required_error: "postId is required",
        }),
    }),
};
exports.createPostSchema = (0, zod_1.object)({
    ...postSchema,
});
exports.updatePostSchema = (0, zod_1.object)({
    ...postSchema,
}).extend(paramsSchema);
exports.deletePostSchema = (0, zod_1.object)({
    ...paramsSchema,
});
