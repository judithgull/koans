import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Exercise, ExerciseProgress, ISeries } from '../../model';
import * as st from '../../store';

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

  constructor(private store: Store<st.State>) { }

  ngOnInit() {
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.progress$ = this.store.select(st.getSelectedUserState);
    this.series$ = this.store.select(st.getSelectedSeries);
  }
}
