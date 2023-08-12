import { Column, Entity, ManyToOne, OneToMany } from "typeorm";
import Model from "./base.entity";
import { IsNotEmpty, IsString, MinLength } from "class-validator";
import { User } from "./user.entity";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";

@Entity("posts")
export class Post extends Model {
  @Column({ name: "title" })
  @IsNotEmpty({ message: "title is required" })
  @IsString()
  title: string;

  @Column({ name: "body" })
  @IsString()
  @IsNotEmpty({ message: "post body is required" })
  @MinLength(5, { message: "Post body must be at least 5 characters long" })
  body: string;

  @ManyToOne(() => User, (user) => user.posts, {
    cascade: true,
    onDelete: "CASCADE",
  })
  user: User;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
