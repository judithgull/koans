import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { RouterStateUrl } from './router-state-url';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './series.reducer';

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  series: sr.SeriesEntities;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  series: sr.reducer
};

export const getRouterState = createFeatureSelector<
  RouterReducerState<RouterStateUrl>
>('routerReducer');

export const getSeries = createFeatureSelector<sr.SeriesEntities>('series');
