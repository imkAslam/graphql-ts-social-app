import { Auth } from "./index";
import DataBaseSource from "../config/database.config";
import { Post } from "../entities/post.entity";
import { GraphQLError } from "graphql";

export async function index(offset: number, limit: number): Promise<Post[]> {
  const posts = await DataBaseSource.getRepository(Post).find({
    relations: {
      comments: {
        user: true,
      },
      likes: {
        user: true,
      },
    },
    skip: offset,
    take: limit,
  });
  return posts;
}

export async function findOne(id: string): Promise<Post> {
  const post = await DataBaseSource.getRepository(Post).findOneByOrFail({
    id: id,
  });
  return post;
}

export async function create(body: any, userId: string): Promise<Post[]> {
  const manager = DataBaseSource.getRepository(Post);
  const user = await Auth.findOne(userId);
  if (!user)
    throw new GraphQLError("User not found", {
      extensions: {
        code: "BAD_USER_INPUT",
        argumentName: "userId",
      },
    });

  const post = manager.create({
    ...body,
    user: user,
  });

  return await manager.save(post);
}
