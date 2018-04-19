import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ExerciseProgress, ISeries } from '../../model';
import * as st from '../../store';
import * as rst from '../store';

@Component({
  selector: 'app-series-container',
  templateUrl: './series-container.component.html'
})
export class SeriesContainerComponent implements OnInit {
  series$: Store<ISeries>;
  progresses$: Store<ExerciseProgress[]>;
  progress$: Store<ExerciseProgress>;

  constructor(private store: Store<st.State>) { }

  ngOnInit() {
    this.series$ = this.store.select(st.getSelectedSeries);
    this.progresses$ = this.store.select(rst.getAllExerciseProgresses);
    this.progress$ = this.store.select(rst.getSelectedUserState);
  }
}
