import { User } from "../entities/user.entity";
import DataBaseSource from "../config/database.config";
import ValidateEntity from "../validators/entity-validation";
// import { UserInputError } from "apollo-server-errors";
import { CreateUser, AuthUser } from "src/interfaces/user.interface";
import { GraphQLError } from "graphql";
import jwt from "jsonwebtoken";
import { matchPassword } from "../utils";

export const create = async (body: CreateUser): Promise<User | unknown> => {
  const isUser = await findByEmail(body.email);
  if (isUser)
    throw new GraphQLError("User already exists", {
      extensions: {
        code: "BAD_USER_INPUT",
        argumentName: "email",
      },
    });
  const user = DataBaseSource.getRepository(User).create(body);
  const { isValid, errors } = await ValidateEntity(user);

  if (!isValid)
    throw new GraphQLError("Bad request", {
      extensions: {
        code: "BAD_USER_INPUT",
        exception: {
          code: "BAD_USER_INPUT",
          stacktrace: errors,
        },
      },
    });
  const result = await DataBaseSource.getRepository(User).save(user);
  return result;
};

export const index = async () => {
  const users = await DataBaseSource.getRepository(User).find({
    relations: {
      posts: {
        comments: {
          user: true,
        },
      },
    },
  });
  return users;
};

export const login = async ({
  email,
  password,
}: AuthUser): Promise<unknown> => {
  const secret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";

  const user: User | any = await DataBaseSource.getRepository(User).findOneBy({
    email: email,
  });

  if (!user)
    throw new GraphQLError("Invalid credentials", {
      extensions: {
        code: "BAD_USER_INPUT",
        argumentName: "email/password",
      },
    });

  const verifyUser = await matchPassword(password, user?.password);

  if (!verifyUser)
    throw new GraphQLError("Invalid credentials", {
      extensions: {
        code: "BAD_USER_INPUT",
        argumentName: "email/password",
      },
    });

  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.userName,
    },
    secret,
    {
      expiresIn: "2h",
    }
  );
  return { ...user, token };
};

export const findOne = async (userId: string) => {
  const user = await DataBaseSource.getRepository(User).findOneByOrFail({
    id: userId,
  });
  return user;
};

async function findByEmail(email: string) {
  const user = await DataBaseSource.getRepository(User).findOneBy({
    email: email,
  });
  return user;
}
