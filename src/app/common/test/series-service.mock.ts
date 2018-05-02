import { Observable, of } from 'rxjs';

import { ISeries } from '../../model/series';
import { mockSeries } from './series.mock';

export class MockSeriesService {
  get(id: string): Observable<ISeries> {
    return of(mockSeries[0]);
  }
}
