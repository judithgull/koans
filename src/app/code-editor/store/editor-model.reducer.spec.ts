import { editorModelReducer, initialState } from './editor-model.reducer';
import { ChangeModelValueAction } from '.';

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
});
