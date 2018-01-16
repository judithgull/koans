import * as rs from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

export interface State {
  routerReducer: rs.RouterReducerState<RouterStateUrl>;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: rs.routerReducer
};

export const getRouterState = createFeatureSelector<
  rs.RouterReducerState<RouterStateUrl>
>('routerReducer');

export class CustomSerializer
  implements rs.RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;

    let state: ActivatedRouteSnapshot = routerState.root;

    let params = {};
    while (state.firstChild) {
      state = state.firstChild;
      params = {
        ...params,
        ...state.params
      };
    }

    return { url, queryParams, params };
  }
}
