import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Exercise } from '../../common/model/exercise';
import { ProgrammingLanguages } from '../../common/model/programming-languages';
import { Series } from '../../common/model/series';
import { ProgrammingLanguage } from '../../common/model/programming-language';
import { State, CreateSeries, UpdateSeries } from '../../store/index';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-series-form',
  templateUrl: './series-form.component.html',
  styleUrls: ['./series-form.component.scss']
})
export class SeriesFormComponent {
  form: FormGroup;
  model: Series;

  programmingLanguages: ProgrammingLanguages[] = [
    {
      key: ProgrammingLanguage.typescript.toString(),
      value: 'Typescript'
    },
    {
      key: ProgrammingLanguage.javascript.toString(),
      value: 'Javascript'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private toastr: ToastsManager,
    private store: Store<State>
  ) {
    const seriesData = this.route.snapshot.data.series;
    if (seriesData) {
      this.model = new Series(seriesData);
    } else {
      this.model = new Series();
      this.addExercise();
    }
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

  submit() {
    const submitAction = this.model._id
      ? new UpdateSeries(this.model)
      : new CreateSeries(this.model);

    this.store.dispatch(submitAction);
  }

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }
}
