import { Column, Entity, ManyToOne } from "typeorm";
import Model from "./base.entity";
import { User } from "./user.entity";
import { Post } from "./post.entity";

@Entity("likes")
export class Like extends Model {
  @Column({ name: "liked_by", nullable: false })
  likedBy: string;

  @ManyToOne(() => User, (user) => user, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @ManyToOne(() => Post, (post) => post.likes, {
    cascade: true,
    onDelete: "CASCADE",
  })
  post: Post;
}
