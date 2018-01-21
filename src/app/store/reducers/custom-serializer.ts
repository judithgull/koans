import { RouterStateSerializer } from '@ngrx/router-store';
import { RouterStateUrl } from './router-state-url';
import {
  Params,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
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
