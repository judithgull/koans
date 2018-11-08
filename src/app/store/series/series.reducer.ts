import { EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { ISeries } from '../../model';
import { SeriesActions, SeriesActionTypes } from './series.action';
import { SeriesState } from './series.state';
import { AppState } from '../app.state';
import { createSelector } from '@ngrx/store';

export const INITIAL_STATE: SeriesState = {
  ids: [],
  entities: {},
  selectedSeriesId: undefined,
  selectedExerciseNr: undefined
};

const adapter: EntityAdapter<ISeries> = createEntityAdapter<ISeries>();

function addId(series: ISeries) {
  return {
    ...series,
    id: series._id
  };
}

const removeId = (entity: any) => {
  if (entity) {
    const { 'id': id, ...entityWithoutId } = entity;
    return entityWithoutId;
  }
  return undefined;
}

export function seriesReducer(state = INITIAL_STATE, action: SeriesActions): SeriesState {
  switch (action.type) {
    case SeriesActionTypes.SELECT:
      return {
        ...state,
        selectedSeriesId: action.seriesId
      }
    case SeriesActionTypes.SELECT_EXERCISE:
      return {
        ...state,
        selectedExerciseNr: action.exerciseNr
      }
    case SeriesActionTypes.LOAD_SUCCESS:
    case SeriesActionTypes.CREATE_SUCCESS:
    case SeriesActionTypes.UPDATE_SUCCESS: {
      const entity = addId(action.series);
      return {
        ...adapter.addOne(entity, state)
      };
    }
    case SeriesActionTypes.QUERY_SUCCESS: {
      const eWithIds = action.series.map(addId);
      return {
        ...adapter.upsertMany(eWithIds, state)
      };
    }
    case SeriesActionTypes.DELETE_SUCCESS: {
      return adapter.removeOne(action.seriesId, state);
    }
  }
  return state;
}

export namespace SeriesQueries {

  const getEntities = (state: AppState) => state.series.entities;
  export const selectedSeriesId = (state:AppState) => state.series.selectedSeriesId;
  export const selectedExerciseNr = (state:AppState) => state.series.selectedExerciseNr;

  export const all = createSelector(
    getEntities,
    entities => Object.values(entities).map(entity => removeId(entity))
  );

  export function byAuthorId(authorId: string) {
    return createSelector(
      all,
      series => series.filter(s => s.authorId === authorId)
    );
  }

  export const byId = (id: string) => {
    return createSelector(
      getEntities,
      entities => removeId(entities[id])
    );
  };

  export const selectedSeries = createSelector(
    getEntities,
    selectedSeriesId,
    (entities, seriesId) => {
      if (seriesId) {
        return removeId(entities[seriesId]);
      }
      return undefined;
    }
  );

  export const selectedExercise = createSelector(
    selectedSeries,
    selectedExerciseNr,
    (series, exerciseNr) => {
      return (
        series && exerciseNr && removeId(series.items[exerciseNr-1])
      );
    }
  );
}
