import { Pagination } from "../../interfaces/interfaces";
import { checkAuth } from "../../middlewares/authenticator";
import { Posts } from "../../services";

const PostResolvers = {
  Query: {
    getPosts: async (_: any, { offset, limit }: Pagination, context: any) => {
      await checkAuth(context);
      return await Posts.index(offset, limit);
    },

    getPost: async (_: any, args: any) => {
      const { id } = args;
      return await Posts.findOne(id);
    },
  },

  Mutation: {
    createPost: async (_: any, args: object, context: any) => {
      const user = await checkAuth(context);
      const { postInput }: any = args;
      return await Posts.create(postInput, user.id);
    },
  },
};

export default PostResolvers;
