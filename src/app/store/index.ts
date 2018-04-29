import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import { RouterStateUrl } from './router';
import { SeriesEntities, seriesReducer, SeriesEffects } from './series';
import { RouterEffects } from './router/router.effect';
import { SeriesRouterEffects } from './series-routing';
import { EditorModelEffects } from './editor-model/editor-model.effect';
import { EditorModelEntities, editorModelReducer } from './editor-model';

export interface State {
  routerReducer: RouterReducerState<RouterStateUrl>;
  series: SeriesEntities;
  editorModel: EditorModelEntities;
}

export const reducers: ActionReducerMap<State> = {
  routerReducer: routerReducer,
  series: seriesReducer,
  editorModel: editorModelReducer
};

export const effects: any[] = [
  SeriesEffects,
  RouterEffects,
  SeriesRouterEffects,
  EditorModelEffects
];

export * from './series';
export * from './router';
export * from './series-routing';
export * from './editor-model';
