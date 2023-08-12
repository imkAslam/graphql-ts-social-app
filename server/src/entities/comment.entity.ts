import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity("comments")
export class Comment extends Model {
  @Column({ name: "commented_by", nullable: false })
  commentedBy: string;

  @Column({ name: "comment", nullable: true, default: "" })
  comment: string;

  @ManyToOne(() => User, (user) => user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments, {
    cascade: true,
    onDelete: "CASCADE",
  })
  post: Post;
}
