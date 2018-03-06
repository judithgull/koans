import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';

import {
  ErrorMarker,
  Exercise,
  ExerciseProgress,
  ISeries,
  ModelState
} from '../../model';
import * as st from '../../store';
import * as rst from '../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent implements OnInit, OnChanges {
  @Input() ex: Exercise;

  @Input() progress: ExerciseProgress;

  @Input() series: ISeries;

  userValue = '';
  programmingLanguage;

  markers: ErrorMarker[] = [];
  seriesLength: number = 0;

  constructor(private store: Store<st.State>) {}

  ngOnInit(): void {
    this.userValue = this.progress.value;
    this.seriesLength = this.series.items.length;
    this.programmingLanguage = this.series.programmingLanguage;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.progress &&
      changes.progress.currentValue &&
      changes.progress.previousValue &&
      changes.progress.currentValue.id !== changes.progress.previousValue.id
    ) {
      this.userValue = changes.progress.currentValue.userSolution;
    }
  }

  toggleSolution() {
    this.store.dispatch(
      new rst.ToggleSolutionVisible({
        seriesId: this.series._id,
        id: this.ex.sortOrder
      })
    );
  }

  updateModelChange(modelState: ModelState) {
    this.store.dispatch(
      new rst.RegisterModel({
        seriesId: this.series._id,
        id: this.ex.sortOrder,
        modelState: modelState
      })
    );
  }

  updateFeedback(markers: ErrorMarker[]) {
    this.markers = markers;
    // TODO
    if (markers.length === 0) {
      // TODO get user solution from feedback
      this.store.dispatch(
        new rst.ExerciseSolved({
          seriesId: this.series._id,
          id: this.ex.sortOrder,
          userSolution: this.userValue
        })
      );
    }
  }
}
