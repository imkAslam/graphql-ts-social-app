import { checkAuth } from "../../middlewares/authenticator";
import { Likes } from "../../services";

const LikesResolvers = {
  Query: {
    likes: async (_: any, args: any, context: any) => {
      await checkAuth(context);
      const { postId } = args;
      return Likes.index(postId);
    },
  },
  Mutation: {
    likePost: async (_: any, args: any, context: any) => {
      const user = await checkAuth(context);
      const { postId } = args;

      return await Likes.create(user, postId);
    },
  },
};
export default LikesResolvers;
