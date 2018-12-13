import { SeriesState } from './series/series.state';
import { EditorModelState } from './editor-model/editor-model-state';

export interface AppState {
    series: SeriesState;
    editorModel: EditorModelState;
  }
