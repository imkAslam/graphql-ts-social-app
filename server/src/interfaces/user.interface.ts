export interface CreateUser {
  userName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  email: string;
  password: string;
}

export interface JwtPayload {
  id: string;
  email: string;
  username: string;
  iat: number | string;
  exp: number | string;
}
