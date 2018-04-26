import { Component, Input, OnChanges, OnInit, SimpleChanges, SimpleChange } from '@angular/core';
import { Store } from '@ngrx/store';

import { ErrorMarker, Exercise, ExerciseKey, Feedback, ISeries } from '../../model';
import * as st from '../../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent implements OnInit, OnChanges {

  @Input() ex: Exercise;

  @Input() progress: Feedback;

  @Input() series: ISeries;

  userValue = '';
  programmingLanguage;

  markers: ErrorMarker[] = [];
  seriesLength: number = 0;

  constructor(private store: Store<st.State>) { }

  get exerciseKey(): ExerciseKey {
    return new ExerciseKey(this.series._id, this.ex.sortOrder);
  }

  get exercisePath(): string {
    return this.exerciseKey.exercisePath;
  }

  get exerciseModelConfig(): { path: string, initialValue: string } {
    return { path: this.exercisePath, initialValue: this.ex.exercise };
  }

  get solutionModelConfig(): { path: string, initialValue: string } {
    return { path: this.solutionPath, initialValue: this.ex.exercise };
  }

  get solutionPath(): string {
    return this.exerciseKey.solutionPath;
  }

  ngOnInit(): void {
    this.userValue = this.progress ? this.progress.value : this.ex.exercise;
    this.seriesLength = this.series.items.length;
    this.programmingLanguage = this.series.programmingLanguage;
  }

  /**
   * On route change set the user value to the last progress value of the current exercise
   */
  ngOnChanges(changes: SimpleChanges): void {
    const { ex } = changes;
    console.log(changes);
    if (ex) {
      this.userValue = this.progress ? this.progress.value : ex.currentValue.exercise;
      console.log('new user value');
      console.log(this.userValue);
    }
  }

  onExerciseValueChange(value: string) {
    console.log(value);
  }

  toggleSolution() {
    this.store.dispatch(
      new st.ToggleSolutionVisible({
        seriesId: this.series._id,
        id: this.ex.sortOrder
      })
    );
    this.store.dispatch(
      new st.ModelSolutionVisibleToggle(this.exerciseKey)
    );
  }

  updateFeedback(markers: ErrorMarker[]) {
    this.markers = markers;
  }
}
