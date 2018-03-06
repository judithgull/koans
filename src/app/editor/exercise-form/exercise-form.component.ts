import { CodeEditorTextValidators } from '../../code-editor-validators/code-editor-text-validators';
import { ProgrammingLanguages } from '../../model/programming-languages';
import { Feedback2 } from '../../model/feedback';
import { Exercise } from '../../model/exercise';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() item: Exercise;
  @Input() programmingLanguage: string;

  solutionFeedback: Feedback2[];

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

  updateSolutionError(feedbacks: Feedback2[]) {
    this.solutionFeedback = feedbacks;
    const solutionControl = this.form.get('codeEditors.exSolution');
    solutionControl.setErrors({ error: true });
  }
}
