import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import {
  Exercise,
  ProgrammingLanguages,
  Series,
  ProgrammingLanguage,
  ISeries
} from '../../model';
import {
  State,
  CreateSeries,
  UpdateSeries,
  getSelectedSeries
} from '../../store/index';

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

  constructor(private fb: FormBuilder, private store: Store<State>) {
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
