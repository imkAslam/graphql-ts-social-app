"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const authenticator_1 = require("../../middlewares/authenticator");
const services_1 = require("../../services");
const PostResolvers = {
    Query: {
        getPosts: async (_, _args, context) => {
            await (0, authenticator_1.checkAuth)(context);
            return await services_1.Posts.index();
        },
        getPost: async (_, args) => {
            const { id } = args;
            return await services_1.Posts.findOne(id);
        },
    },
    Mutation: {
        createPost: async (_, args, context) => {
            const user = await (0, authenticator_1.checkAuth)(context);
            const { postInput } = args;
            return await services_1.Posts.create(postInput, user.id);
        },
    },
};
exports.default = PostResolvers;
//# sourceMappingURL=PostResolvers.js.map