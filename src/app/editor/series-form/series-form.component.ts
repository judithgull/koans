import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ISeries, IExercise } from '../../model';
import { IUser } from '../../model/user';
import { CodeEditorTextValidators } from '../../code-editor-validators/code-editor-text-validators';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent implements OnInit {
  @Input() model: ISeries;
  @Input() author: IUser;

  @Output() submitSeries = new EventEmitter<ISeries>();

  form: FormGroup;
  items: FormArray;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.items = this.fb.array(
      this.model.items.map(item => this.newItemFormGroup(item))
    );
    this.form = this.fb.group({
      title: [this.model.title, Validators.required],
      items: this.items
    });
  }

  private newItemFormGroup(item?: IExercise): FormGroup {
    return this.fb.group({
      title: item && item.title,
      description: [item && item.description, Validators.required],
      code: this.fb.group(
        {
          exercise: [
            item && item.exercise,
            [Validators.required, CodeEditorTextValidators.containsText('???')]
          ],
          solution: [item && item.solution, Validators.required]
        },
        {
          validator: CodeEditorTextValidators.onlyTextChanged(
            '???',
            'exercise',
            'solution'
          )
        }
      )
    });
  }

  removeExercise(i: number) {
    this.items.removeAt(i);
  }

  addExercise() {
    this.items.push(this.newItemFormGroup());
  }

  onSubmit() {
    const formValue = this.form.value;
    const items: [IExercise] = formValue.items.map((item, i: number) => ({
      title: item.title,
      description: item.description,
      exercise: item.code.exercise,
      solution: item.code.solution,
      sortOrder: i + 1
    }));

    const series: ISeries = {
      ...this.model,
      authorId: this.author.id,
      title: formValue.title,
      items
    };
    this.submitSeries.emit(series);
  }
}
