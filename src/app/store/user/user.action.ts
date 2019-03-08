import { Action } from '@ngrx/store';
import { INonSensitiveUser, IUser } from '../../model/user';

export enum UserActionTypes {
  UPSERT_REQUEST = '[User] UPDATE/INSERT REQUEST',
  UPSERT_SUCCESS = '[User] UPDATE/INSERT SUCCESS',
  SELECT = '[User] SELECT',
  ERROR = '[User] ERROR'
}
export class UserError implements Action {
  readonly type = UserActionTypes.ERROR;
  constructor(public payload: any) {}
}

export class UserUpsertRequest implements Action {
  readonly type = UserActionTypes.UPSERT_REQUEST;
  constructor(public user: IUser) {}
}

export class UserUpsertSuccess implements Action {
  readonly type = UserActionTypes.UPSERT_SUCCESS;
  constructor(public user: INonSensitiveUser) {}
}

export class UserSelectRequest implements Action {
  readonly type = UserActionTypes.SELECT;
  constructor(public id: string) {}
}

export type UserActions =
  | UserUpsertRequest
  | UserUpsertSuccess
  | UserError
  | UserSelectRequest;
