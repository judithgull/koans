import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router';
import { SeriesEntities, seriesReducer, SeriesEffects } from './series';
import { RouterEffects } from './router/router.effect';
import { SeriesRouterEffects } from './series-routing';
import { ProgressEffects, SeriesProgressEntities, progressReducer } from './progress';

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  series: SeriesEntities;
  progress: SeriesProgressEntities;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  series: seriesReducer,
  progress: progressReducer
};

export const effects: any[] = [
  SeriesEffects,
  RouterEffects,
  SeriesRouterEffects,
  ProgressEffects
];

export * from './series';
export * from './router';
export * from './series-routing';
export * from './progress';
