import { editorModelReducer, initialState } from './editor-model.reducer';
import { ChangeModelValueAction, ValidationResultAction } from '.';
import {
  FeedbackFactory,
  SourceType,
  FeedbackDetails
} from '../../common/model';

describe('editorModelReducer', () => {
  const errorDetails: FeedbackDetails = {
    success: false,
    message: 'error',
    startLineNumber: -1
  };

  it('should return the default state', () => {
    const action: any = {};
    const state = editorModelReducer(undefined, action);
    expect(state).toBe(initialState);
  });

  it('should change the value on valueChange', () => {
    const action = new ChangeModelValueAction({
      id: 'id1',
      versionId: 0,
      value: 'value'
    });
    const state = editorModelReducer(undefined, action);
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
    const action = new ChangeModelValueAction({
      id: 'id1',
      versionId: 0,
      value: 'value'
    });
    const state = editorModelReducer({ entities: { ...entity2 } }, action);
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
  it('should ignore for older changes', () => {
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

  it('should update successful validation', () => {
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

  it('should update validation result', () => {
    const feedback = FeedbackFactory.createSuccess(
      SourceType.Validation,
      'value'
    );
    const initialEntity = {
      id1: {
        id: 'id1',
        versionId: 0,
        value: 'value',
        result: feedback
      }
    };

    const action = new ValidationResultAction({
      id: 'id1',
      versionId: 1,
      value: 'value2',
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
          value: 'value2',
          validation: errorDetails
        }
      }
    });
  });
});
