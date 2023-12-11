"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserPinsSchema = void 0;
const zod_1 = require("zod");
exports.updateUserPinsSchema = (0, zod_1.object)({
    body: (0, zod_1.object)({
        email: (0, zod_1.string)({
            required_error: "Email is required",
        })
            .trim()
            .email("Invalid email or password"),
        pins: (0, zod_1.array)((0, zod_1.string)({
            required_error: "post id is required",
        })),
    }),
});
