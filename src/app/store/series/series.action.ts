import { ISeries } from '../../common/model/series';
import { Action } from '@ngrx/store';
import { SearchParams } from '../../common/model/search.params';

export const LOAD_SERIES = 'LOAD SERIES';
export const LOAD_SERIES_FAIL = 'LOAD SERIES FAIL';
export const LOAD_SERIES_SUCCESS = 'LOAD SERIES SUCCESS';

export const QUERY_SERIES = 'QUERY SERIES';
export const QUERY_SERIES_FAIL = 'QUERY SERIES FAIL';
export const QUERY_SERIES_SUCCESS = 'QUERY SERIES SUCCESS';

export class QuerySeries implements Action {
  readonly type = QUERY_SERIES;
  constructor(public searchParams: SearchParams) {}
}

export class QuerySeriesFail implements Action {
  readonly type = QUERY_SERIES_FAIL;
  constructor(public payload: any) {}
}

export class QuerySeriesSuccess implements Action {
  readonly type = QUERY_SERIES_SUCCESS;
  constructor(public payload: ISeries[]) {}
}

export class LoadSeries implements Action {
  readonly type = LOAD_SERIES;
  constructor(public id: string) {}
}

export class LoadSeriesFail implements Action {
  readonly type = LOAD_SERIES_FAIL;
  constructor(public payload: any) {}
}

export class LoadSeriesSuccess implements Action {
  readonly type = LOAD_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

// create
export const CREATE_SERIES = 'CREATE SERIES';
export const CREATE_SERIES_SUCCESS = 'CREATE SERIES SUCCESS';
export const CREATE_SERIES_FAIL = 'CREATE SERIES FAIL';

export class CreateSeries implements Action {
  readonly type = CREATE_SERIES;
  constructor(public payload: ISeries) {}
}

export class CreateSeriesSuccess implements Action {
  readonly type = CREATE_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

export class CreateSeriesFail implements Action {
  readonly type = CREATE_SERIES_FAIL;
  constructor(public payload: any) {}
}

// update

export const UPDATE_SERIES = 'UPDATE SERIES';
export const UPDATE_SERIES_SUCCESS = 'UPDATE SERIES SUCCESS';
export const UPDATE_SERIES_FAIL = 'UPDATE SERIES FAIL';

export class UpdateSeries implements Action {
  readonly type = UPDATE_SERIES;
  constructor(public payload: ISeries) {}
}

export class UpdateSeriesSuccess implements Action {
  readonly type = UPDATE_SERIES_SUCCESS;
  constructor(public payload: ISeries) {}
}

export class UpdateSeriesFail implements Action {
  readonly type = UPDATE_SERIES_FAIL;
  constructor(public payload: any) {}
}

// delete

export const DELETE_SERIES = 'DELETE SERIES';
export const DELETE_SERIES_SUCCESS = 'DELETE SERIES SUCCESS';
export const DELETE_SERIES_FAIL = 'DELETE SERIES FAIL';

export class DeleteSeries implements Action {
  readonly type = DELETE_SERIES;
  constructor(public payload: string) {}
}

export class DeleteSeriesSuccess implements Action {
  readonly type = DELETE_SERIES_SUCCESS;
  constructor(public payload: string) {}
}

export class DeleteSeriesFail implements Action {
  readonly type = DELETE_SERIES_FAIL;
  constructor(public payload: any) {}
}

export type SeriesAction =
  | LoadSeries
  | LoadSeriesFail
  | LoadSeriesSuccess
  | QuerySeries
  | QuerySeriesFail
  | QuerySeriesSuccess
  | CreateSeries
  | CreateSeriesSuccess
  | CreateSeriesFail
  | UpdateSeries
  | UpdateSeriesFail
  | UpdateSeriesSuccess
  | DeleteSeries
  | DeleteSeriesFail
  | DeleteSeriesSuccess;
