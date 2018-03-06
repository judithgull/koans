import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CodeEditorTextValidators } from '../../code-editor-validators/code-editor-text-validators';
import { Exercise } from '../../model/exercise';
import { ErrorMarker } from '../../model/feedback';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() item: Exercise;
  @Input() programmingLanguage: string;

  solutionFeedback: ErrorMarker[];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    const codeEditors = this.fb.group(
      {
        exExercise: [
          null,
          [Validators.required, CodeEditorTextValidators.containsText('???')]
        ],
        exSolution: [null, Validators.required]
      },
      {
        validator: CodeEditorTextValidators.onlyTextChanged(
          '???',
          'exExercise',
          'exSolution'
        )
      }
    );

    this.form = this.fb.group({
      exTitle: [],
      exDescription: [null, Validators.required],
      codeEditors
    });
  }

  updateSolutionError(markers: ErrorMarker[]) {
    this.solutionFeedback = markers;
    const solutionControl = this.form.get('codeEditors.exSolution');
    solutionControl.setErrors({ error: true });
  }
}
