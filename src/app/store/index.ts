import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router';
import { SeriesEntities, seriesReducer, SeriesEffects } from './series';
import { RouterEffects } from './router/router.effect';
import { SeriesRouterEffects } from './series-routing';

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  series: SeriesEntities;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  series: seriesReducer
};

export const effects: any[] = [
  SeriesEffects,
  RouterEffects,
  SeriesRouterEffects
];

export * from './series';
export * from './router';
export * from './series-routing';
