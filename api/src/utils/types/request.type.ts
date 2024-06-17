import { IncomingMessage } from 'http';

export interface IRequest extends IncomingMessage {
  user?: IRequestUser;
}

export interface IRequestWithUser extends IncomingMessage {
  user: IRequestUser;
}

export interface IRequestUser {
  id: number;
  iat: number;
  exp: number;
}
