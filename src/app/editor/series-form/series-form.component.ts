import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Exercise,
  ProgrammingLanguages,
  Series,
  ProgrammingLanguage,
  ISeries
} from '../../model';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent {
  @Input() model: Series;
  @Input() programmingLanguages: ProgrammingLanguages[];

  @Output() submitSeries = new EventEmitter<ISeries>();

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      programmingLanguage: [ProgrammingLanguage.typescript],
      title: [null, Validators.required]
    });
  }

  removeExercise(i: number) {
    this.model.removeItem(i);
  }

  addExercise() {
    this.model.addItem(new Exercise());
  }

  onSubmit() {
    this.submitSeries.emit(this.model);
  }
}
