import { ActionReducerMap } from '@ngrx/store';
import { seriesReducer, SeriesEffects } from './series';
import { RouterEffects } from './router/router.effect';
import { SeriesRouterEffects } from './series-routing';
import { EditorModelEffects } from './editor-model/editor-model.effect';
import { editorModelReducer } from './editor-model';
import { AppState } from './app.state';
import { userReducer } from './user/user.reducer';
import { Type } from '@angular/core';
import { UserEffects } from './user/user.effect';

export const reducers: ActionReducerMap<AppState> = {
  series: seriesReducer,
  editorModel: editorModelReducer,
  users: userReducer
};

export const effects: Array<Type<any>> = [
  SeriesEffects,
  RouterEffects,
  SeriesRouterEffects,
  EditorModelEffects,
  UserEffects
];

export * from './series';
export * from './router';
export * from './series-routing';
export * from './editor-model';
export * from './app.state';
