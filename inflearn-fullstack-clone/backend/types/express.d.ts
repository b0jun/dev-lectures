import { Request } from 'express';

type JwtPayload = {
  sub: string;
  email?: string;
  name?: string;
  picture?: null;
  iat?: number;
};

declare module 'express' {
  export interface Request {
    user: JwtPayload;
  }
}
