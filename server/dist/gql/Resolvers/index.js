"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PostResolvers_1 = __importDefault(require("./PostResolvers"));
const UserResolver_1 = __importDefault(require("./UserResolver"));
const Resolvers = {
    Query: {
        ...UserResolver_1.default.Query,
        ...PostResolvers_1.default.Query,
    },
    Mutation: {
        ...UserResolver_1.default.Mutation,
        ...PostResolvers_1.default.Mutation,
    },
};
exports.default = Resolvers;
//# sourceMappingURL=index.js.map