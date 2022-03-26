import { User } from './users/users.model';

export interface GmailDataModel {
  gmail: string;
  name: string;
}

export interface UserAuthDataModel {
  message: string | null;
  user: User | null;
}

export interface TokenModel {
  token: string;
}
