import { CodeEditorTextValidators } from '../../code-editor-validators/code-editor-text-validators';
import { ProgrammingLanguages } from '../../common/model/programming-languages';
import { Feedback } from '../../common/model/feedback';
import { Exercise } from '../../common/model/exercise';
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

  solutionFeedback: Feedback[];

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

  updateSolutionError(feedbacks: Feedback[]) {
    this.solutionFeedback = feedbacks;
    const solutionControl = this.form.get('codeEditors.exSolution');
    solutionControl.setErrors({ error: true });
  }
}
