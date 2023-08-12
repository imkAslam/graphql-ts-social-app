"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOne = exports.login = exports.index = exports.create = void 0;
const user_entity_1 = require("../entities/user.entity");
const database_config_1 = __importDefault(require("../config/database.config"));
const entity_validation_1 = __importDefault(require("../validators/entity-validation"));
const graphql_1 = require("graphql");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const utils_1 = require("../utils");
const create = async (body) => {
    const isUser = await findByEmail(body.email);
    if (isUser)
        throw new graphql_1.GraphQLError("User already exists", {
            extensions: {
                code: "BAD_USER_INPUT",
                argumentName: "email",
            },
        });
    const user = database_config_1.default.getRepository(user_entity_1.User).create(body);
    const { isValid, errors } = await (0, entity_validation_1.default)(user);
    if (!isValid)
        throw new graphql_1.GraphQLError("Bad request", {
            extensions: {
                code: "BAD_USER_INPUT",
                exception: {
                    code: "BAD_USER_INPUT",
                    stacktrace: errors,
                },
            },
        });
    const result = await database_config_1.default.getRepository(user_entity_1.User).save(user);
    return result;
};
exports.create = create;
const index = async () => {
    const users = await database_config_1.default.getRepository(user_entity_1.User).find({
        relations: {
            posts: true,
        },
    });
    return users;
};
exports.index = index;
const login = async ({ email, password, }) => {
    const secret = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
    const user = await database_config_1.default.getRepository(user_entity_1.User).findOneBy({
        email: email,
    });
    if (!user)
        throw new graphql_1.GraphQLError("Invalid credentials", {
            extensions: {
                code: "BAD_USER_INPUT",
                argumentName: "email/password",
            },
        });
    const verifyUser = await (0, utils_1.matchPassword)(password, user?.password);
    if (!verifyUser)
        throw new graphql_1.GraphQLError("Invalid credentials", {
            extensions: {
                code: "BAD_USER_INPUT",
                argumentName: "email/password",
            },
        });
    const token = jsonwebtoken_1.default.sign({
        id: user.id,
        email: user.email,
        username: user.userName,
    }, secret, {
        expiresIn: "2h",
    });
    return { ...user, token };
};
exports.login = login;
const findOne = async (userId) => {
    const user = await database_config_1.default.getRepository(user_entity_1.User).findOneByOrFail({
        id: userId,
    });
    return user;
};
exports.findOne = findOne;
async function findByEmail(email) {
    const user = await database_config_1.default.getRepository(user_entity_1.User).findOneBy({
        email: email,
    });
    return user;
}
//# sourceMappingURL=auth.service.js.map