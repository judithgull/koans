import { User } from '../../auth/model/user';

export interface LoginTokenInfo {
  token: string;
  user: User;
}
