import { Post } from "../entities/post.entity";
import { Like } from "../entities/like.entity";
import { manager } from "../utils";

const query = manager(Like);
const postQuery = manager(Post);
export async function index(id: string) {
  const result = await query.find({
    where: {
      post: {
        id: id,
      },
    },
  });
  return result;
}

export async function create(user: any, postId: string) {
  const post = await postQuery.findOne({
    where: {
      id: postId,
    },
    relations: {
      likes: {
        user: true,
      },
      comments: true,
    },
  });

  const isLiked = post?.likes.find((like) => like.user.id === user.id);

  if (isLiked) {
    await query.delete(isLiked.id);
  } else {
    const newLike = query.create({
      user: user,
      likedBy: user.username,
      post: {
        id: postId,
      },
    });
    await query.save(newLike);
  }

  return await postQuery.findOne({
    where: {
      id: postId,
    },
    relations: {
      likes: true,
    },
  });
}
