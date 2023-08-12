import jwt from "jsonwebtoken";
import { AuthenticationError } from "apollo-server-core";
import { GraphQLError } from "graphql";
import { JwtPayload } from "../interfaces/user.interface";

// this is the middleware for the authentication of user either user is logged  in or not!!!
export async function checkAuth(ctx: any): Promise<JwtPayload> {
  const headerToken = ctx?.req.headers.authorization || "";

  if (!headerToken) throw new AuthenticationError("unauthorized");

  const secret: string = process.env.JWT_SECRET ? process.env.JWT_SECRET : "";
  const token = headerToken.split("Bearer ")[1];

  if (!token)
    throw new GraphQLError("token must be Bearer [token]", {
      extensions: {
        code: "UNAUTHORIZED",
        argumentName: "Bearer [token]",
      },
    });

  const user: JwtPayload | any = jwt.verify(token, secret);

  if (!user) throw new AuthenticationError("invalid/expired token");

  return user;
}
