import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';

export const GO = ' [router] GO';
export const HOME = ' [router] HOME';

export class Go implements Action {
  readonly type = GO;
  constructor(
    public payload: {
      path: any[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

export class Home implements Action {
  readonly type = HOME;
}
