import { ISeries } from '../../common/model/series';
import { Action } from '@ngrx/store';

// load series
export const LOAD_SERIES = 'LOAD SERIES';
export const LOAD_SERIES_FAIL = 'LOAD SERIES FAIL';
export const LOAD_SERIES_SUCCESS = 'LOAD SERIES SUCCESS';

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

export type SeriesAction = LoadSeries | LoadSeriesFail | LoadSeriesSuccess;
