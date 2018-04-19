import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrorMarker, Exercise, ExerciseProgress, ISeries } from '../../model';
import * as st from '../../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent implements OnInit, OnChanges {
  @Input() ex: Exercise;

  @Input() progress: ExerciseProgress;

  @Input() series: ISeries;

  exercisePath: string;
  solutionPath: string;

  userValue = '';
  programmingLanguage;

  markers: ErrorMarker[] = [];
  seriesLength: number = 0;

  constructor(private store: Store<st.State>) { }

  ngOnInit(): void {
    this.userValue = this.progress.value;
    this.seriesLength = this.series.items.length;
    this.programmingLanguage = this.series.programmingLanguage;
    this.updatePaths();
  }

  /**
   * On route change set the user value to the last progress value of the current exercise
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.progress &&
      changes.progress.previousValue &&
      changes.progress.currentValue.id !== changes.progress.previousValue.id
    ) {
      this.userValue = changes.progress.currentValue.value;
      this.updatePaths();
    }
  }

  updatePaths() {
    const path = this.series._id + '/' + this.ex.sortOrder;
    this.exercisePath = path + '/exercise';
    this.solutionPath = path + '/solution';
  }

  toggleSolution() {
    this.store.dispatch(
      new st.ToggleSolutionVisible({
        seriesId: this.series._id,
        id: this.ex.sortOrder
      })
    );
  }

  updateFeedback(markers: ErrorMarker[]) {
    this.markers = markers;
  }
}
