import { editorModelReducer, initialState } from './editor-model.reducer';
import {
  ChangeModelValueAction,
  ValidationResultAction,
  MonacoErrorAction,
  MonacoSuccessAction
} from '.';
import {
  FeedbackFactory,
  SourceType,
  FeedbackDetails,
  ErrorMarker
} from '../../common/model';

describe('editorModelReducer', () => {
  const errorDetails: FeedbackDetails = {
    success: false,
    errors: [
      {
        message: 'error',
        startLineNumber: -1
      }
    ]
  };
  const errorMarkers2: ErrorMarker[] = [
    {
      message: 'error2',
      startLineNumber: -1
    }
  ];
  const changeModelAction = new ChangeModelValueAction({
    id: 'id1',
    versionId: 0,
    value: 'value'
  });

  it('should return the default state', () => {
    const action: any = {};
    const state = editorModelReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should change the value on valueChange', () => {
    const state = editorModelReducer(undefined, changeModelAction);
    expect(state).toEqual({
      entities: {
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value'
        }
      }
    });
  });

  it('should not change other ids', () => {
    const entity2 = {
      id2: {
        id: 'id2',
        versionId: 0,
        value: 'value'
      }
    };
    const state = editorModelReducer(
      { entities: { ...entity2 } },
      changeModelAction
    );
    expect(state).toEqual({
      entities: {
        ...entity2,
        id1: {
          id: 'id1',
          versionId: 0,
          value: 'value'
        }
      }
    });
  });
  it('should ignore older changes', () => {
    const initialEntity = {
      id1: {
        id: 'id1',
        versionId: 1,
        value: 'value'
      }
    };
    const action = new ChangeModelValueAction({
      id: 'id1',
      versionId: 0,
      value: 'value1'
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
          value: 'value'
        }
      }
    });
  });

  it('should overwrite for newer changes', () => {
    const initialEntity = {
      id1: {
        id: 'id1',
        versionId: 0,
        value: 'value'
      }
    };
    const action = new ChangeModelValueAction({
      id: 'id1',
      versionId: 1,
      value: 'value1'
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
          value: 'value1'
        }
      }
    });
  });

  it('should update failed validation', () => {
    const initialEntity = {
      id1: {
        id: 'id1',
        versionId: 0,
        value: 'value'
      }
    };

    const action = new ValidationResultAction({
      id: 'id1',
      versionId: 1,
      value: 'value1',
      validation: errorDetails
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
        validation: errorDetails
      }
    };

    const action = new ChangeModelValueAction({
      id: 'id1',
      versionId: 1,
      value: 'value2'
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
          value: 'value2'
        }
      }
    });
  });

  it('should update monaco result on change', () => {
    const initialEntity = {
      id1: {
        id: 'id1',
        versionId: 0,
        value: 'value',
        validation: errorDetails
      }
    };

    const action = new MonacoErrorAction({
      id: 'id1',
      versionId: 1,
      value: 'value2',
      errors: errorMarkers2
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
          validation: errorDetails,
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
        validation: errorDetails
      }
    };

    const action = new MonacoSuccessAction({
      id: 'id1',
      versionId: 1,
      value: 'value2'
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
