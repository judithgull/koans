import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Exercise,  ISeries, Feedback, ErrorMarker } from '../../model';
import { map } from 'rxjs/operators/map';
import { AppState, getSelectedProgress } from '../../store';
import { SeriesFacade } from '../../store/series/series.facade';

@Component({
  selector: 'app-run-exercise-container',
  template: `
  <app-run-exercise-card
    [ex]="ex$ | async"
    [progress]="progress$ | async"
    [errors]="errors$ | async"
    [series]="series$ | async">
  </app-run-exercise-card>`
})
export class RunExerciseContainerComponent implements OnInit {
  ex$: Observable<Exercise>;
  progress$: Observable<Feedback>;
  errors$: Observable<ErrorMarker[]>;
  series$: Observable<ISeries>;

  constructor(private store: Store<AppState>, private seriesFacade:SeriesFacade) { }

  ngOnInit() {
    this.ex$ = this.seriesFacade.selectedExercise$;
    this.progress$ = this.store.select(getSelectedProgress);
    this.series$ = this.seriesFacade.selectedSeries$;

    this.errors$ = this.progress$
      .pipe(
        map(f => {
          if (f && f.validation && !f.validation.success) {
            return f.validation.errors;
          } else if (f && f.monaco && !f.monaco.success) {
            return f.monaco.errors;
          } else if (f && f.execution && !f.execution.success) {
            return f.execution.errors;
          }
          return [];
        })
      )
  }
}
