"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserType = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const jwtCredentials_1 = require("../utils/jwtCredentials");
const post_models_1 = require("./post.models");
var UserType;
(function (UserType) {
    UserType["STUDENT"] = "student";
    UserType["PROFESSOR"] = "professor";
    UserType["STAFF"] = "staff";
})(UserType || (exports.UserType = UserType = {}));
let User = class User {
    name;
    email;
    password;
    passwordResetCode;
    role;
    pins;
};
exports.User = User;
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typegoose_1.prop)({ lowercase: true, required: true, unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", Object)
], User.prototype, "passwordResetCode", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true, type: String, enum: UserType }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typegoose_1.prop)({ ref: () => post_models_1.Post, default: [] }),
    __metadata("design:type", Array)
], User.prototype, "pins", void 0);
exports.User = User = __decorate([
    (0, typegoose_1.index)({ email: 1 }, { unique: true }),
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: "User",
            timestamps: true,
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    }),
    (0, typegoose_1.pre)("save", async function (next) {
        const user = this;
        if (!user.isModified("password"))
            next();
        const hashedPassword = await (0, jwtCredentials_1.securePassword)(user.password);
        user.password = hashedPassword;
        return;
    })
], User);
