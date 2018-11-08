import { routerReducer } from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';
import { seriesReducer, SeriesEffects } from './series';
import { RouterEffects } from './router/router.effect';
import { SeriesRouterEffects } from './series-routing';
import { EditorModelEffects } from './editor-model/editor-model.effect';
import { editorModelReducer } from './editor-model';
import { AppState } from './app.state';

export const reducers: ActionReducerMap<AppState> = {
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
export * from './app.state';
