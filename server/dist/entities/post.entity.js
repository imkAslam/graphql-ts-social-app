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
exports.Post = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = __importDefault(require("./base.entity"));
const class_validator_1 = require("class-validator");
const user_entity_1 = require("./user.entity");
const comment_entity_1 = require("./comment.entity");
const like_entity_1 = require("./like.entity");
let Post = exports.Post = class Post extends base_entity_1.default {
    title;
    body;
    user;
    comments;
    likes;
};
__decorate([
    (0, typeorm_1.Column)({ name: "title" }),
    (0, class_validator_1.IsNotEmpty)({ message: "title is required" }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Post.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: "body" }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "post body is required" }),
    (0, class_validator_1.MinLength)(5, { message: "Post body must be at least 5 characters long" }),
    __metadata("design:type", String)
], Post.prototype, "body", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.posts, {
        cascade: true,
        onDelete: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.User)
], Post.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => comment_entity_1.Comment, (comment) => comment.post),
    __metadata("design:type", Array)
], Post.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => like_entity_1.Like, (like) => like.post),
    __metadata("design:type", Array)
], Post.prototype, "likes", void 0);
exports.Post = Post = __decorate([
    (0, typeorm_1.Entity)("posts")
], Post);
//# sourceMappingURL=post.entity.js.map