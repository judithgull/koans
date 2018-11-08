import { Action } from '@ngrx/store';
import { ISeries } from '../../model/series';
import { SearchParams } from '../../model/search.params';

// TODO: QUERY, LOAD, SELECT

export enum SeriesActionTypes {
  QUERY_REQUEST  = '[Series] QUERY REQUEST',
  QUERY_SUCCESS  = '[Series] QUERY SUCCESS',
  LOAD_REQUEST   = '[Series] LOAD REQUEST',
  LOAD_SUCCESS   = '[Series] SELECT SUCCESS',
  CREATE_REQUEST = '[Series] CREATE REQUEST',
  CREATE_SUCCESS = '[Series] CREATE SUCCESS',
  UPDATE_REQUEST = '[Series] UPDATE REQUEST',
  UPDATE_SUCCESS = '[Series] UPDATE SUCCESS',
  DELETE_REQUEST = '[Series] DELETE REQUEST',
  DELETE_SUCCESS = '[Series] DELETE SUCCESS',
  SELECT         = '[Series] SELECT',
  SELECT_EXERCISE  = '[Series] SELECT EXERCISE',
  ERROR          = '[Series] ERROR'
}

export class SeriesError implements Action {
  readonly type = SeriesActionTypes.ERROR;
  constructor(public payload: any) { }
}

export class SeriesQueryRequest implements Action {
  readonly type = SeriesActionTypes.QUERY_REQUEST;
  constructor(public searchParams: SearchParams) { }
}

export class SeriesQuerySuccess implements Action {
  readonly type = SeriesActionTypes.QUERY_SUCCESS;
  constructor(public series: ISeries[]) { }
}

export class SeriesLoadRequest implements Action {
  readonly type = SeriesActionTypes.LOAD_REQUEST;
  constructor(public id: string) { }
}

export class SeriesLoadSuccess implements Action {
  readonly type = SeriesActionTypes.LOAD_SUCCESS;
  constructor(public series: ISeries) { }
}

export class SeriesCreateRequest implements Action {
  readonly type = SeriesActionTypes.CREATE_REQUEST;
  constructor(public series: ISeries) { }
}

export class SeriesCreateSuccess implements Action {
  readonly type = SeriesActionTypes.CREATE_SUCCESS;
  constructor(public series: ISeries) { }
}

export class SeriesUpdateRequest implements Action {
  readonly type = SeriesActionTypes.UPDATE_REQUEST;
  constructor(public series: ISeries) { }
}

export class SeriesUpdateSuccess implements Action {
  readonly type = SeriesActionTypes.UPDATE_SUCCESS;
  constructor(public series: ISeries) { }
}

export class SeriesDeleteRequest implements Action {
  readonly type = SeriesActionTypes.DELETE_REQUEST;
  constructor(public seriesId: string) { }
}

export class SeriesDeleteSuccess implements Action {
  readonly type = SeriesActionTypes.DELETE_SUCCESS;
  constructor(public seriesId: string) { }
}

export class SeriesSelectAction implements Action {
  readonly type = SeriesActionTypes.SELECT;
  constructor(public seriesId: string) { }
}

export class ExerciseSelectAction implements Action {
  readonly type = SeriesActionTypes.SELECT_EXERCISE;
  constructor(public exerciseNr: number) { }
}

export type SeriesActions =
  | SeriesError
  | SeriesLoadRequest
  | SeriesLoadSuccess
  | SeriesQueryRequest
  | SeriesQuerySuccess
  | SeriesCreateRequest
  | SeriesCreateSuccess
  | SeriesUpdateRequest
  | SeriesUpdateSuccess
  | SeriesDeleteRequest
  | SeriesDeleteSuccess
  | SeriesSelectAction
  | ExerciseSelectAction;
