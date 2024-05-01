import { Request } from 'express';

export interface IUser {
  name: string;
  email: string;
  resetToken: string;
}

export interface IRequestInfos {
  protocol: string;
  host: string;
  originalUrl: string;
}

export interface IMailer {
  user: IUser;
  request: IRequestInfos;
}
