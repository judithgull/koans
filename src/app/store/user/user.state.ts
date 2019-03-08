import { INonSensitiveUser } from '../../model/user';
import { EntityState } from '@ngrx/entity';

export interface UserState extends EntityState<INonSensitiveUser> {
  currentId: string;
}
