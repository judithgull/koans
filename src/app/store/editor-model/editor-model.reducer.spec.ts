import { ChangeModelValueAction, ResultErrorAction, ResultSuccessAction } from '..';
import { ErrorMarker, FeedbackDetails, ProgrammingLanguage, SourceType } from '../../model';
import { editorModelReducer, emInitialState } from './editor-model.reducer';

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

  const entity1 = {
    id: 'id1',
    versionId: 0,
    value: 'value',
    progLang: ProgrammingLanguage.javascript,
    valid: false
  };

  const entity2 = {
    id: 'id2',
    versionId: 0,
    value: 'value',
    progLang: ProgrammingLanguage.typescript,
    valid: false
  };

  describe('Default State', () => {
    it('should return the initial state', () => {
      const action: any = {};
      const state = editorModelReducer(undefined, action);
      expect(state).toBe(emInitialState);
    });
  });

  describe('Value Change', () => {
    it('should change the value on valueChange', () => {
      const state = editorModelReducer(undefined, changeValueAction);
      expect(state).toEqual({ entities: { id1: entity1 } });
    });

    it('should not change other entities', () => {
      const state = editorModelReducer(
        { entities: { id2: entity2 } },
        changeValueAction
      );
      expect(state).toEqual({
        entities: {
          id2: entity2,
          id1: entity1
        }
      });
    });

    it('should ignore older changes', () => {
      const initialEntity = {
        id1: {
          ...entity1,
          versionId: 1,
          valid: true
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
            ...entity1,
            versionId: 1,
            valid: true
          }
        }
      });
    });

    it('should overwrite for newer changes', () => {
      const initialEntity = {
        id1: entity1
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
            ...entity1,
            value: 'value1',
            versionId: 1,
            progLang: ProgrammingLanguage.typescript
          }
        }
      });
    });
  });

  describe('Validation', () => {
    it('should update failed validation', () => {
      const initialEntity = {
        id1: entity1
      };

      const action = new ResultErrorAction(
        SourceType.validation,
        {
          id: 'id1',
          versionId: 0,
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
            ...entity1,
            validation: errorDetails,
            valid: false
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
            progLang: ProgrammingLanguage.typescript,
            valid: false
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
        SourceType.monaco,
        {
          id: 'id1',
          versionId: 0,
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
            versionId: 0,
            value: 'value',
            progLang: ProgrammingLanguage.typescript,
            validation: errorDetails,
            monaco: {
              success: false,
              errors: errorMarkers2
            },
            valid: false
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

      const action = new ResultSuccessAction(SourceType.monaco, {
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
            },
            valid: false
          }
        }
      });
    });
  });

  describe('Execution', () => {
    it('should update state to valid, if everything passes', () => {
      const success = {
        success: true,
        errors: []
      };
      const initialEntity = {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value',
          progLang: ProgrammingLanguage.typescript,
          validation: success
        }
      };

      const action = new ResultSuccessAction(SourceType.execution, {
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
            validation: success,
            execution: success,
            valid: true
          }
        }
      });
    });
    });
  });
