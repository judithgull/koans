import { ISeries } from '../../common/model/series';
import { Action } from '@ngrx/store';
import { SearchParams } from '../../common/model/search.params';

export const SERIES_ERROR = 'SERIES ERROR';

export const LOAD_SERIES = 'LOAD SERIES';
export const LOAD_SERIES_SUCCESS = 'LOAD SERIES SUCCESS';

export const QUERY_SERIES = 'QUERY SERIES';
export const QUERY_SERIES_SUCCESS = 'QUERY SERIES SUCCESS';

export class SeriesError implements Action {
  readonly type = SERIES_ERROR;
  constructor(public payload: any) {}
}

export class QuerySeries implements Action {
  readonly type = QUERY_SERIES;
  constructor(public searchParams: SearchParams) {}
}

export class QuerySeriesSuccess implements Action {
  readonly type = QUERY_SERIES_SUCCESS;
  constructor(public payload: ISeries[]) {}
}

export class LoadSeries implements Action {
  readonly type = LOAD_SERIES;
  constructor(public id: string) {}
}

export class LoadSeriesSuccess implements Action {
  readonly type = LOAD_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

// create
export const CREATE_SERIES = 'CREATE SERIES';
export const CREATE_SERIES_SUCCESS = 'CREATE SERIES SUCCESS';

export class CreateSeries implements Action {
  readonly type = CREATE_SERIES;
  constructor(public payload: ISeries) {}
}

export class CreateSeriesSuccess implements Action {
  readonly type = CREATE_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

// update
export const UPDATE_SERIES = 'UPDATE SERIES';
export const UPDATE_SERIES_SUCCESS = 'UPDATE SERIES SUCCESS';

export class UpdateSeries implements Action {
  readonly type = UPDATE_SERIES;
  constructor(public payload: ISeries) {}
}

export class UpdateSeriesSuccess implements Action {
  readonly type = UPDATE_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

// delete
export const DELETE_SERIES = 'DELETE SERIES';
export const DELETE_SERIES_SUCCESS = 'DELETE SERIES SUCCESS';

export class DeleteSeries implements Action {
  readonly type = DELETE_SERIES;
  constructor(public payload: string) {}
}

export class DeleteSeriesSuccess implements Action {
  readonly type = DELETE_SERIES_SUCCESS;
  constructor(public payload: string) {}
}

export type SeriesAction =
  | SeriesError
  | LoadSeries
  | LoadSeriesSuccess
  | QuerySeries
  | QuerySeriesSuccess
  | CreateSeries
  | CreateSeriesSuccess
  | UpdateSeries
  | UpdateSeriesSuccess
  | DeleteSeries
  | DeleteSeriesSuccess;
