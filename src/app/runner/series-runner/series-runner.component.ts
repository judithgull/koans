import { ISeries } from '../../common/model/series';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ProgrammingLanguage } from '../../common/model/programming-language';
import { Store } from '@ngrx/store';
import * as st from '../../store';
import * as rst from '../store';
import { ExerciseUserProgress, Exercise } from '../../common/model/exercise';

@Component({
  selector: 'app-series-runner',
  templateUrl: './series-runner.component.html',
  styleUrls: ['./series-runner.component.scss']
})
export class SeriesRunnerComponent implements OnInit {
  series$: Store<ISeries>;
  userStates$: Store<{ [id: string]: ExerciseUserProgress }>;
  ex$: Store<Exercise>;
  userState$: Store<ExerciseUserProgress>;

  constructor(private route: ActivatedRoute, private store: Store<st.State>) {}

  ngOnInit() {
    this.route.params.subscribe((data: { id: string }) => {
      this.store.dispatch(new st.LoadSeries(data.id));
    });
    this.series$ = this.store.select(st.getSeries);
    this.userStates$ = this.store.select(rst.getSelectedSeriesState);
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.userState$ = this.store.select(rst.getSelectedUserState);
  }
}
