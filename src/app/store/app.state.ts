import { RouterReducerState } from '@ngrx/router-store';
import { SeriesState } from './series/series.state';
import { RouterStateUrl } from './router/router-state-url';
import { EditorModelState } from './editor-model/editor-model-state';

export interface AppState {
    routerReducer: RouterReducerState<RouterStateUrl>;
    series: SeriesState;
    editorModel: EditorModelState;
  }
