import { editorModelReducer, initialState } from './editor-model.reducer';
import {
  ChangeModelValueAction,
  ResultErrorAction,
  ResultSuccessAction
} from '.';
import {
  FeedbackFactory,
  SourceType,
  FeedbackDetails,
  ErrorMarker,
  ProgrammingLanguage
} from '../../model';

describe('editorModelReducer', () => {
  const errors = [
    {
      message: 'error',
      startLineNumber: 1
    }
  ];
  const errorDetails: FeedbackDetails = {
    success: false,
    errors
  };
  const errorMarkers2: ErrorMarker[] = [
    {
      message: 'error2',
      startLineNumber: -1
    }
  ];
  const changeValueAction = new ChangeModelValueAction({
    id: 'id1',
    versionId: 0,
    value: 'value',
    progLang: ProgrammingLanguage.javascript
  });

  describe('Default State', () => {
    it('should return the default state', () => {
      const action: any = {};
      const state = editorModelReducer(undefined, action);
      expect(state).toBe(initialState);
    });
  });

  describe('Value Change', () => {
    it('should change the value on valueChange', () => {
      const state = editorModelReducer(undefined, changeValueAction);
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.javascript
          }
        }
      });
    });

    it('should not change other entities', () => {
      const entity2 = {
        id2: {
          id: 'id2',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        }
      };
      const state = editorModelReducer(
        { entities: { ...entity2 } },
        changeValueAction
      );
      expect(state).toEqual({
        entities: {
          ...entity2,
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.javascript
          }
        }
      });
    });

    it('should ignore older changes', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 1,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        }
      };
      const action = new ChangeModelValueAction({
        id: 'id1',
        versionId: 0,
        value: 'value1',
        progLang: ProgrammingLanguage.typescript
      });
      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 1,
            value: 'value',
            progLang: ProgrammingLanguage.typescript
          }
        }
      });
    });

    it('should overwrite for newer changes', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.javascript
        }
      };
      const action = new ChangeModelValueAction({
        id: 'id1',
        versionId: 1,
        value: 'value1',
        progLang: ProgrammingLanguage.typescript
      });
      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 1,
            value: 'value1',
            progLang: ProgrammingLanguage.typescript
          }
        }
      });
    });
  });

  describe('Validation', () => {
    it('should update failed validation', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        }
      };

      const action = new ResultErrorAction(
        'validation',
        {
          id: 'id1',
          versionId: 1,
          value: 'value1',
          progLang: ProgrammingLanguage.typescript
        },
        errors
      );
      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 1,
            value: 'value1',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails
          }
        }
      });
    });

    it('should reset validation result on change', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript,
          validation: errorDetails
        }
      };

      const action = new ChangeModelValueAction({
        id: 'id1',
        versionId: 1,
        value: 'value2',
        progLang: ProgrammingLanguage.typescript
      });
      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 1,
            value: 'value2',
            progLang: ProgrammingLanguage.typescript
          }
        }
      });
    });
  });

  describe('Monaco', () => {
    it('should update monaco result on change', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript,
          validation: errorDetails
        }
      };

      const action = new ResultErrorAction(
        'monaco',
        {
          id: 'id1',
          versionId: 1,
          value: 'value',
          progLang: ProgrammingLanguage.typescript
        },
        errorMarkers2
      );

      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 1,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            monaco: {
              success: false,
              errors: errorMarkers2
            }
          }
        }
      });
    });
    it('should update monaco success on change', () => {
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript,
          validation: errorDetails
        }
      };

      const action = new ResultSuccessAction('monaco', {
        id: 'id1',
        versionId: 0,
        value: 'value',
        progLang: ProgrammingLanguage.typescript
      });

      const state = editorModelReducer(
        { entities: { ...initialEntity } },
        action
      );
      expect(state).toEqual({
        entities: {
          id1: {
            id: 'id1',
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails,
            monaco: {
              success: true,
              errors: []
            }
          }
        }
      });
    });
  });
});
