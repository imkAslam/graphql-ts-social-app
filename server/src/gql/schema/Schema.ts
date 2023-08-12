import { gql } from "apollo-server-express";

const Schema = gql`
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
    comments: [Comment]!
    likes: [Like]!
    commentsCount: Int!
    likesCount: Int!
    createdAt: String
    updatedAt: String
  }

  type Like {
    id: String!
    likedBy: String
    createdAt: String
    updatedAt: String
  }

  type Comment {
    id: String!
    comment: String
    user: User
    createdAt: String
    updatedAt: String
    deletedAt: String
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
    getPosts(offset: Int, limit: Int): [Post] #@cacheControl(maxAge: 300)
    getPost(id: String): Post
    getComments: [Comment]
    likes(postId: String): [Like]
  }

  type Mutation {
    register(registerInput: RegisterInput): User!
    login(email: String, password: String): Auth!
    createPost(postInput: PostInput, userId: String): Post!
    likePost(postId: String): Post!
    addComment(postId: String, comment: String): Post!
  }

  type Subscription {
    newPost: Post!
  }
`;
export default Schema;
