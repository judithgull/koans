import { Component, Input } from '@angular/core';

import {
  ErrorMarker,
  Exercise,
  ExerciseKey,
  Feedback,
  ISeries
} from '../../model';
import { EditorModelFacade } from '../../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent {
  @Input() ex: Exercise;

  @Input() progress: Feedback;

  @Input() series: ISeries;

  @Input() errors: ErrorMarker[];

  constructor(private facade: EditorModelFacade) {}

  get exerciseKey(): ExerciseKey {
    return new ExerciseKey(this.series.id, this.ex.sortOrder);
  }

  get exerciseModelConfig(): { path: string; initialValue: string } {
    return {
      path: this.exerciseKey.exercisePath,
      initialValue: this.ex.exercise
    };
  }

  get solutionModelConfig(): { path: string; initialValue: string } {
    return {
      path: this.exerciseKey.solutionPath,
      initialValue: this.ex.exercise
    };
  }

  onExerciseValueChange(value: string) {
    // console.log(value);
  }

  toggleSolution() {
    this.facade.toggleSolution(this.exerciseKey);
  }
}
