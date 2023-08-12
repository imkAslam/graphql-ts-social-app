import { Post } from "../../interfaces/interfaces";
import CommentResolvers from "./CommentResolvers";
import LikesResolvers from "./LikeResolvers";
import PostResolvers from "./PostResolvers";
import UserResolvers from "./UserResolver";

const Resolvers = {
  Post: {
    likesCount: (parent: Post): number => parent?.likes?.length || 0,
    commentsCount: (parent: Post): number => parent?.comments?.length || 0,
  },
  Query: {
    ...UserResolvers.Query,
    ...PostResolvers.Query,
    ...CommentResolvers.Query,
    ...LikesResolvers.Query,
  },
  Mutation: {
    ...UserResolvers.Mutation,
    ...PostResolvers.Mutation,
    ...CommentResolvers.Mutation,
    ...LikesResolvers.Mutation,
  },
};
export default Resolvers;
