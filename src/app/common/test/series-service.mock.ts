import '../../../rx-index';

import { Observable } from 'rxjs/Observable';

import { ISeries } from '../model/series';
import { mockSeries } from './series.mock';

export class MockSeriesService {
  get(id: string): Observable<ISeries> {
    return Observable.of(mockSeries[0]);
  }
}
