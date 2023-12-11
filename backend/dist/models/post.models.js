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
exports.Post = exports.EventStatusType = void 0;
const user_models_1 = require("./user.models");
const typegoose_1 = require("@typegoose/typegoose");
var EventStatusType;
(function (EventStatusType) {
    EventStatusType["SCHEDULED"] = "scheduled";
    EventStatusType["ONGOING"] = "ongoing";
    EventStatusType["CANCELLED"] = "cancelled";
    EventStatusType["DELAYED"] = "delayed";
})(EventStatusType || (exports.EventStatusType = EventStatusType = {}));
let Post = class Post {
    author;
    title;
    tags;
    location;
    startDate;
    endDate;
    status;
    description;
};
exports.Post = Post;
__decorate([
    (0, typegoose_1.prop)({ required: true, ref: () => user_models_1.User }),
    __metadata("design:type", Object)
], Post.prototype, "author", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typegoose_1.prop)({ type: () => [String] }),
    __metadata("design:type", Array)
], Post.prototype, "tags", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", String)
], Post.prototype, "location", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], Post.prototype, "startDate", void 0);
__decorate([
    (0, typegoose_1.prop)({ required: true }),
    __metadata("design:type", Date)
], Post.prototype, "endDate", void 0);
__decorate([
    (0, typegoose_1.prop)({
        required: true,
        type: String,
        enum: EventStatusType,
        default: EventStatusType.SCHEDULED,
    }),
    __metadata("design:type", String)
], Post.prototype, "status", void 0);
__decorate([
    (0, typegoose_1.prop)(),
    __metadata("design:type", String)
], Post.prototype, "description", void 0);
exports.Post = Post = __decorate([
    (0, typegoose_1.modelOptions)({
        schemaOptions: {
            collection: "Post",
            timestamps: true,
        },
        options: {
            allowMixed: typegoose_1.Severity.ALLOW,
        },
    })
], Post);
