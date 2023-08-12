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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Like = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base.entity"));
const user_entity_1 = require("./user.entity");
const post_entity_1 = require("./post.entity");
let Like = exports.Like = class Like extends base_entity_1.default {
    likedBy;
    user;
    post;
};
__decorate([
    (0, typeorm_1.Column)({ name: "liked_by", nullable: false }),
    __metadata("design:type", String)
], Like.prototype, "likedBy", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], Like.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => post_entity_1.Post, (post) => post.likes, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", post_entity_1.Post)
], Like.prototype, "post", void 0);
exports.Like = Like = __decorate([
    (0, typeorm_1.Entity)("likes")
], Like);
//# sourceMappingURL=like.entity.js.map