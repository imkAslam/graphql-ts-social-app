import { checkAuth } from "../../middlewares/authenticator";
import { Comments } from "../../services";

const CommentResolvers = {
  Query: {
    getComments: async (_: any, args: any, context: any) => {
      const user = await checkAuth(context);
      console.log(user);
      const { postId } = args;
      return Comments.index(postId);
    },
  },
  Mutation: {
    addComment: async (_: any, args: any, context: any) => {
      const user = await checkAuth(context);
      const { postId, comment } = args;
      return Comments.add(user, postId, comment);
    },
  },
};

export default CommentResolvers;
