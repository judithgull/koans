import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot
} from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Exercise, ExerciseInfo } from '../common/model/exercise';
import { SeriesService } from '../common/series.service';

@Injectable()
export class ExerciseResolve implements Resolve<ExerciseInfo> {
  constructor(private service: SeriesService) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<ExerciseInfo> {
    const seriesId = route.params.id ? route.params.id : route.parent.params.id;
    const exId: number = route.params.exId
      ? parseInt(route.params.exId, 10)
      : 0;
    return this.service.getExercise(seriesId, exId);
  }
}
