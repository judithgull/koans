import { IUser } from '../../model/user';
import { EntityState } from '@ngrx/entity';

export interface UserState extends EntityState<IUser> {
  currentUid: string;
}
