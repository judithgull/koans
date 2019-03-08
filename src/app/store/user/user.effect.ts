import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user/user.service';

import {
  UserActionTypes,
  UserUpsertRequest,
  UserError,
  UserUpsertSuccess
} from './user.action';
import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ErrorHandlerService } from '../../services';

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userService: UserService,
    private errorHandler: ErrorHandlerService
  ) {}

  @Effect()
  upsertUsers$ = this.actions$.pipe(
    ofType(UserActionTypes.UPSERT_REQUEST),
    switchMap((a: UserUpsertRequest) => {
      return this.userService.save(a.user).pipe(
        map(user => new UserUpsertSuccess(user)),
        catchError(error => of(new UserError(error)))
      );
    })
  );

  @Effect({ dispatch: false })
  userErrors$ = this.actions$.pipe(
    ofType(UserActionTypes.ERROR),
    map((a: UserError) => a.payload),
    tap(error => this.errorHandler.handleErrorResponse(error))
  );
}
