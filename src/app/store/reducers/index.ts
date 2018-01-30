import { routerReducer, RouterReducerState } from '@ngrx/router-store';

import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as sr from './series.reducer';

export const getSeries = createFeatureSelector<sr.SeriesEntities>('series');
