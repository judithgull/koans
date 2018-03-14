import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Exercise, ExerciseProgress, ISeries } from '../../model';
import * as st from '../../store';
import * as rst from '../store';
import { Observable } from 'rxjs';
import { distinct } from 'rxjs/operators';

@Component({
  selector: 'app-run-exercise-container',
  template: `
  <app-run-exercise-card
    [ex]="ex$ | async"
    [progress]="progress$ | async"
    [series]="series$ | async">
  </app-run-exercise-card>`
})
export class RunExerciseContainerComponent implements OnInit {
  ex$: Store<Exercise>;
  progress$: Observable<ExerciseProgress>;
  series$: Store<ISeries>;

  constructor(private store: Store<st.State>) {}

  ngOnInit() {
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.progress$ = this.store
      .select(rst.getSelectedUserState)
      .pipe(distinct());
    this.series$ = this.store.select(st.getSelectedSeries);
  }
}
