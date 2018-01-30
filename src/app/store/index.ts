import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './reducers/series.reducer';
import { RouterStateUrl } from './router';

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  series: sr.SeriesEntities;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  series: sr.reducer
};

export * from './reducers';
export * from './actions';
export * from './effects';
export * from './selectors';
export * from './router';
