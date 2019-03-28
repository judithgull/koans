import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';
import { UserState } from './user.state';
import { UserActions, UserActionTypes } from './user.action';
import { INonSensitiveUser } from '../../model/user';
import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';

const INITIAL_STATE: UserState = {
  ids: [],
  entities: {},
  currentUid: undefined
};
const adapter: EntityAdapter<INonSensitiveUser> = createEntityAdapter<
  INonSensitiveUser
>();

export function userReducer(
  state = INITIAL_STATE,
  action: UserActions
): UserState {
  switch (action.type) {
    case UserActionTypes.UPSERT_SUCCESS:
      return adapter.upsertOne(action.user, state);
    case UserActionTypes.SELECT:
      return {
        ...state,
        currentUid: action.uid
      };
  }
  return state;
}

export namespace UserQueries {
  const getEntities = (state: AppState) => state.users.entities;

  const currentUid = (state: AppState) => state.users.currentUid;

  export const all = createSelector(
    getEntities,
    entities => Object.values(entities)
  );

  export const currentUser = createSelector(
    all,
    currentUid,
    (entities, uid) => {
      if (uid) {
        const usersWithUid = entities.filter(e => e.uid === uid);
        return usersWithUid.length > 0 ? usersWithUid[0] : undefined;
      }
      return undefined;
    }
  );
}
