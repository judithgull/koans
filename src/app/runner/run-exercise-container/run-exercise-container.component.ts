import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Exercise, ExerciseProgress, ISeries, Feedback, ErrorMarker } from '../../model';
import * as st from '../../store';
import { map } from 'rxjs/operators/map';

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

  constructor(private store: Store<st.State>) { }

  ngOnInit() {
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.progress$ = this.store.select(st.getSelectedProgress);
    this.series$ = this.store.select(st.getSelectedSeries);

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
