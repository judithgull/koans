import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Store } from '@ngrx/store';
import {
  ExerciseProgress,
  Exercise,
  ProgrammingLanguage,
  SeriesProgress,
  ISeries
} from '../../common/model';
import * as st from '../../store';
import * as rst from '../store';

@Component({
  selector: 'app-series-runner',
  templateUrl: './series-runner.component.html',
  styleUrls: ['./series-runner.component.scss']
})
export class SeriesRunnerComponent implements OnInit {
  series$: Store<ISeries>;
  progresses$: Store<ExerciseProgress[]>;
  ex$: Store<Exercise>;
  userState$: Store<ExerciseProgress>;

  constructor(private store: Store<st.State>) {}

  ngOnInit() {
    this.series$ = this.store.select(st.getSelectedSeries);
    this.progresses$ = this.store.select(rst.getAllExerciseProgresses);
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.userState$ = this.store.select(rst.getSelectedUserState);
  }
}
