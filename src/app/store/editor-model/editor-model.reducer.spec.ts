import { ModelValueChange, ModelError, ModelSuccess, ModelSolutionVisibleToggle } from '..';
import { ErrorMarker, FeedbackDetails, ProgrammingLanguage, SourceType, ExerciseKey, ModelState } from '../../model';
import { editorModelReducer, emInitialState } from './editor-model.reducer';
import { mockSeries, testModelState } from '../../common/test';

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
  const changeValueAction = new ModelValueChange({
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
    valid: false,
    solutionRequested: false,
    solutionVisible: false
  };

  const entity2 = {
    id: 'id2',
    versionId: 0,
    value: 'value',
    progLang: ProgrammingLanguage.typescript,
    valid: false,
    solutionRequested: false,
    solutionVisible: false
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
      const action = new ModelValueChange({
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
      const action = new ModelValueChange({
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

    it('ignores success, if there is no value', () => {
      const action = new ModelSuccess('unknown', testModelState);
      const state = editorModelReducer(
        emInitialState,
        action
      );
    });

    it('ignores error, if there is no value', () => {
      const action = new ModelError('unknown', testModelState,[]);
      const state = editorModelReducer(
        emInitialState,
        action
      );
    });


    it('should update failed validation', () => {
      const initialEntity = {
        id1: entity1
      };

      const action = new ModelError(
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
          validation: errorDetails,
          valid: false,
          solutionRequested: false,
          solutionVisible: false
        }
      };

      const action = new ModelValueChange({
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
            valid: false,
            solutionRequested: false,
            solutionVisible: false
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
          validation: errorDetails,
          valid: false,
          solutionRequested: false,
          solutionVisible: false
        }
      };

      const action = new ModelError(
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
            valid: false,
            solutionRequested: false,
            solutionVisible: false
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
          validation: errorDetails,
          valid: false,
          solutionRequested: false,
          solutionVisible: false
        }
      };

      const action = new ModelSuccess(SourceType.monaco, {
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
            valid: false,
            solutionRequested: false,
            solutionVisible: false
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
          validation: success,
          valid: false,
          solutionRequested: false,
          solutionVisible: false
        }
      };

      const action = new ModelSuccess(SourceType.execution, {
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
            valid: true,
            solutionRequested: false,
            solutionVisible: false
          }
        }
      });
    });
  });
  describe('ModelSolutionToggle action', () => {
    it('toggle solution initially', () => {
      const key = new ExerciseKey(1, 2);

      const action = new ModelSolutionVisibleToggle(key);

      const state = editorModelReducer(emInitialState, action);
      const path = key.exercisePath;
      expect(state.entities[path]).toBeUndefined();
    });

    it('toggles solution after value change', () => {
      const key = new ExerciseKey(1, 2);

      const modelState: ModelState = {
        id: key.exercisePath,
        versionId: 0,
        progLang: ProgrammingLanguage.typescript,
        value: 'x'
      }

      const valueChange = new ModelValueChange(modelState);

      const action = new ModelSolutionVisibleToggle(key);

      const state1 = editorModelReducer(emInitialState, valueChange);
      const state = editorModelReducer(state1, action);

      const path = key.exercisePath;
      expect(state.entities[path]).toBeDefined();
      expect(state.entities[path].solutionRequested).toBe(true);
      expect(state.entities[path].solutionVisible).toBe(true);
    });

    it('toggles solution invisible when toggeling twice', () => {
      const key = new ExerciseKey(1, 2);

      const modelState: ModelState = {
        id: key.exercisePath,
        versionId: 0,
        progLang: ProgrammingLanguage.typescript,
        value: 'x'
      }

      const valueChange = new ModelValueChange(modelState);

      const action = new ModelSolutionVisibleToggle(key);

      const state1 = editorModelReducer(emInitialState, valueChange);
      const state2 = editorModelReducer(state1, action);
      const state = editorModelReducer(state2, action);

      const path = key.exercisePath;
      expect(state.entities[path]).toBeDefined();
      expect(state.entities[path].solutionRequested).toBe(true);
      expect(state.entities[path].solutionVisible).toBe(false);
    });

  });

});
