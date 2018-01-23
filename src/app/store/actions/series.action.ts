import { ISeries } from '../../common/model/series';
import { Action } from '@ngrx/store';

export const LOAD_SERIES = 'LOAD SERIES';
export const LOAD_SERIES_FAIL = 'LOAD SERIES FAIL';
export const LOAD_SERIES_SUCCESS = 'LOAD SERIES SUCCESS';

export const QUERY_SERIES = 'QUERY SERIES';
export const QUERY_SERIES_FAIL = 'QUERY SERIES FAIL';
export const QUERY_SERIES_SUCCESS = 'QUERY SERIES SUCCESS';

export interface SearchParams {
  searchText?: string;
  authorId?: string;
}

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

export type SeriesAction =
  | LoadSeries
  | LoadSeriesFail
  | LoadSeriesSuccess
  | QuerySeries
  | QuerySeriesFail
  | QuerySeriesSuccess;
