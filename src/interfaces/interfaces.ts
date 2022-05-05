import { User } from '../modules/users/users.model';

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

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface Credentials {
  email: string;
  password: string;
}
