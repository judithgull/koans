import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { IUser, INonSensitiveUser } from '../../model/user';
import { UserUpsertRequest, UserSelectRequest } from './user.action';
import { Observable } from 'rxjs';
import { UserQueries } from './user.reducer';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserFacade {
  currentUser$: Observable<IUser> = this.store.select(UserQueries.currentUser);

  constructor(private store: Store<AppState>) {}

  upsert(user: IUser) {
    this.store.dispatch(new UserUpsertRequest(user));
    this.store.dispatch(new UserSelectRequest(user.uid));
  }

  deselectUser() {
    this.store.dispatch(new UserSelectRequest(null));
  }
}
