import { Request } from 'express';

export interface IAuthRequest extends Request {
  user: string;
}
