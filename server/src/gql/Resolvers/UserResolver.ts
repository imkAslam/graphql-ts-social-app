// import { checkAuth } from "../../middlewares/authenticator";
import { Auth } from "../../services";

const UserResolvers = {
  Query: {
    getUsers: async (_: any, _args: any, _context: any) => {
      // await checkAuth(context);
      return await Auth.index();
    },
    getUser: async (_: any, args: any) => {
      const { id } = args;
      return await Auth.findOne(id);
    },
  },

  Mutation: {
    register: async (_: any, args: object) => {
      const { registerInput }: any = args;
      return await Auth.create(registerInput);
    },
    login: async (_: any, args: any) => {
      const result = await Auth.login(args);
      return result;
    },
  },
};

export default UserResolvers;
