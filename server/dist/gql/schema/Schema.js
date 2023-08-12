"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
const Schema = (0, apollo_server_express_1.gql) `
  type User {
    id: String!
    userName: String
    email: String
    posts: [Post]
    token: String
    createdAt: String
    updatedAt: String
    deletedAt: String
  }

  type Auth {
    id: String!
    userName: String
    email: String
    token: String
  }

  type Post {
    id: String!
    title: String
    body: String
  }

  input RegisterInput {
    userName: String!
    email: String!
    password: String!
  }

  input PostInput {
    title: String!
    body: String!
  }

  type Query {
    getUsers: [User]
    getUser(id: String): User
  }

  type Query {
    getPosts: [Post]
    getPost(id: String): Post
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String, password: String): Auth!
  }

  type Mutation {
    createPost(postInput: PostInput, userId: String): Post!
  }
`;
exports.default = Schema;
//# sourceMappingURL=Schema.js.map