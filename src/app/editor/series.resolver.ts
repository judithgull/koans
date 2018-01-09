import { SeriesService } from '../common/series.service';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Rx';
import { ExerciseInfo } from '../common/model/exercise';
import { Injectable, state } from '@angular/core';
import { ISeries } from '../common/model/series';

@Injectable()
export class SeriesResolver implements Resolve<ISeries> {
  constructor(private service: SeriesService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISeries> {
    return this.service.get(route.params.id);
  }
}
