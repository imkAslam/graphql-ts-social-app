"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const services_1 = require("../../services");
const UserResolvers = {
    Query: {
        getUsers: async () => await services_1.Auth.index(),
        getUser: async (_, args) => {
            const { id } = args;
            return await services_1.Auth.findOne(id);
        },
    },
    Mutation: {
        register: async (_, args) => {
            const { registerInput } = args;
            return await services_1.Auth.create(registerInput);
        },
        login: async (_, args) => {
            const result = await services_1.Auth.login(args);
            return result;
        },
    },
};
exports.default = UserResolvers;
//# sourceMappingURL=UserResolver.js.map