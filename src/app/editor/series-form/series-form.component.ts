import { ActivatedRoute, Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { SeriesService } from '../../common/series.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Exercise } from '../../common/model/exercise';
import { ProgrammingLanguages } from '../../common/model/programming-languages';
import { Series } from '../../common/model/series';
import { Feedback } from '../../common/model/feedback';
import { ProgrammingLanguage } from '../../common/model/programming-language';

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
    private svc: SeriesService,
    private router: Router,
    private route: ActivatedRoute,
    private toastr: ToastsManager
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
    if (this.model._id) {
      this.svc
        .update(this.model)
        .subscribe(
          () => this.router.navigate(['/']),
          err => this.showError(err)
        );
    } else {
      this.svc
        .create(this.model)
        .subscribe(
          () => this.router.navigate(['/']),
          err => this.showError(err)
        );
    }
  }

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }
}
