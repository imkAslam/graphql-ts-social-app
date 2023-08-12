"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const apollo_server_core_1 = require("apollo-server-core");
const graphql_1 = require("graphql");
async function checkAuth(ctx) {
    const headerToken = ctx?.req.headers.authorization || "";
    if (!headerToken)
        throw new apollo_server_core_1.AuthenticationError("unauthorized");
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
    const token = headerToken.split("Bearer ")[1];
    if (!token)
        throw new graphql_1.GraphQLError("token must be Bearer [token]", {
            extensions: {
                code: "UNAUTHORIZED",
                argumentName: "Bearer [token]",
            },
        });
    const user = jsonwebtoken_1.default.verify(token, secret);
    if (!user)
        throw new apollo_server_core_1.AuthenticationError("invalid/expired token");
    return user;
}
exports.checkAuth = checkAuth;
//# sourceMappingURL=authenticator.js.map