import { manager } from "../utils";
import { Comment } from "../entities/comment.entity";
import { Post } from "../entities/post.entity";

const query = manager(Comment);
const postQuery = manager(Post);
export async function index(_id: string): Promise<Comment[]> {
  const comments = await query.find();
  return comments;
}

export async function add(
  user: any,
  postId: string,
  comment: string
): Promise<unknown> {
  const create = query.create({
    comment: comment,
    commentedBy: user?.username,
    user: user,
    post: { id: postId },
  });

  await query.save(create);
  const post = await postQuery.findOne({
    where: {
      id: postId,
    },
    relations: {
      likes: {
        user: true,
      },
      comments: {
        user: true,
      },
    },
  });

  return post;
}
