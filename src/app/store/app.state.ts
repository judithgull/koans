import { RouterReducerState } from '@ngrx/router-store';
import { SeriesState } from './series/series.state';
import { RouterStateUrl } from './router/router-state-url';
import { EditorModelEntities } from './editor-model/editor-model.reducer';

export interface AppState {
    routerReducer: RouterReducerState<RouterStateUrl>;
    series: SeriesState;
    editorModel: EditorModelEntities;
  }
