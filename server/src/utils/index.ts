import { ObjectType, Repository } from "typeorm";
import bcrypt from "bcrypt";
import DataBaseSource from "../config/database.config";

export function hashPassword(password: string): string {
  const saltRounds = 10;
  const hashedPassword = bcrypt.hashSync(password, saltRounds);
  return hashedPassword;
}

export function matchPassword(
  password: string,
  otherPassword: string
): unknown {
  const result = bcrypt.compare(password, otherPassword);
  return result;
}

export function manager<T extends object>(
  entity: ObjectType<T>
): Repository<T> {
  const res: Repository<T> = DataBaseSource.manager.getRepository(entity);
  return res;
}

// /**
//  * Generate token
//  * @param {ObjectId} userId
//  * @param {Moment} expires
//  * @param {string} type
//  * @param {string} [secret]
//  * @returns {string}
//  */
// const generateToken = (
//   userId: number,
//   userEmail: string,
//   expires: any,
//   type: string = "access",
//   secret = process.env.TOKEN_SECRET
// ) => {
//   const payload = {
//     sub: { userId, userEmail },
//     iat: moment().unix(),
//     exp: expires.unix(),
//     type,
//   };
//   return jwt.sign(payload, secret);
// };
