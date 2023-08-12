"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.create = exports.findOne = exports.index = void 0;
const index_1 = require("./index");
const database_config_1 = __importDefault(require("../config/database.config"));
const post_entity_1 = require("../entities/post.entity");
const graphql_1 = require("graphql");
async function index() {
    const posts = await database_config_1.default.getRepository(post_entity_1.Post).find();
    return posts;
}
exports.index = index;
async function findOne(id) {
    const post = await database_config_1.default.getRepository(post_entity_1.Post).findOneByOrFail({
        id: id,
    });
    return post;
}
exports.findOne = findOne;
async function create(body, userId) {
    const manager = database_config_1.default.getRepository(post_entity_1.Post);
    const user = await index_1.Auth.findOne(userId);
    if (!user)
        throw new graphql_1.GraphQLError("User not found", {
            extensions: {
                code: "BAD_USER_INPUT",
                argumentName: "userId",
            },
        });
    const post = manager.create({
        ...body,
        user: user,
    });
    return await manager.save(post);
}
exports.create = create;
//# sourceMappingURL=post.service.js.map