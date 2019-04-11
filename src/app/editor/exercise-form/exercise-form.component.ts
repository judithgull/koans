import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { ErrorMarker } from '../../model/feedback';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent {
  @Input() form: FormGroup;
  @Input() index: number;

  solutionFeedback: ErrorMarker[];

  get exerciseModelConfig() {
    return { path: this.index + '/exercise', initialValue: '' };
  }

  get solutionModelConfig() {
    return { path: this.index + '/solution', initialValue: '' };
  }

  updateSolutionError(markers: ErrorMarker[]) {
    this.solutionFeedback = markers;
    const solutionControl = this.form.get('code.solution');
    solutionControl.setErrors({ error: true });
  }
}
