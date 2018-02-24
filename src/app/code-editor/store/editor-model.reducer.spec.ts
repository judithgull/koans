import { editorModelReducer, initialState } from './editor-model.reducer';
import {
  ChangeModelValueAction,
  ValidationFailedAction,
  ValidationSuccessAction
} from '.';
import { FeedbackFactory, SourceType } from '../../common/model';

describe('editorModelReducer', () => {
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
    const error = FeedbackFactory.createError(
      SourceType.Validation,
      'message',
      'value1'
    );
    const action = new ValidationFailedAction({
      id: 'id1',
      versionId: 1,
      value: 'value1',
      result: error
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
          result: error
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
    const feedback = FeedbackFactory.createSuccess(
      SourceType.Validation,
      'value1'
    );
    const action = new ValidationSuccessAction({
      id: 'id1',
      versionId: 1,
      value: 'value1',
      result: feedback
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
          result: feedback
        }
      }
    });
  });
});
