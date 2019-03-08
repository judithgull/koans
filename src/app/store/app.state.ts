import { SeriesState } from './series/series.state';
import { EditorModelState } from './editor-model/editor-model-state';
import { UserState } from './user/user.state';

export interface AppState {
  series: SeriesState;
  editorModel: EditorModelState;
  users: UserState;
}
