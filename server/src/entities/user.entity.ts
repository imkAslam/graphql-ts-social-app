import { BeforeInsert, Column, Entity, OneToMany } from "typeorm";
import { hashPassword, matchPassword } from "../utils";
import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import Model from "./base.entity";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity";
import { Like } from "./like.entity";

@Entity("users")
export class User extends Model {
  @Column({ name: "username" })
  @IsNotEmpty({ message: "username is required" })
  userName: string;

  @Column({ unique: true, nullable: false })
  @IsEmail()
  @IsNotEmpty({ message: "email is required" })
  email: string;

  @Column()
  @IsString()
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;

  @Column({ name: "is_active", nullable: false, default: true })
  isActive: boolean;
  static username: string | undefined;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      this.password = await hashPassword(this.password);
    }
  }

  static async comparePasswords(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await matchPassword(candidatePassword, hashedPassword);
  }

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.user)
  likes: Like[];
}
