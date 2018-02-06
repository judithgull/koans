import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  State,
  getSelectedSeries,
  UpdateSeries,
  CreateSeries
} from '../../store';
import {
  ISeries,
  Series,
  Exercise,
  ProgrammingLanguages,
  ProgrammingLanguage
} from '../../common/model';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-series-container',
  template: `
  <app-series-form
    [model]="series$ | async"
    [programmingLanguages]="programmingLanguages">
  </app-series-form>`
})
export class SeriesContainerComponent implements OnInit {
  series$: Observable<Series>;
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

  constructor(private store: Store<State>) {}

  ngOnInit() {
    this.series$ = this.store.select(getSelectedSeries).map(s => {
      return s ? new Series({ ...s }) : this.createNewSeries();
    });
  }

  private createNewSeries(): Series {
    const s = new Series();
    s.addItem(new Exercise());
    return s;
  }

  onSubmit(s: ISeries) {
    this.store.dispatch(s._id ? new UpdateSeries(s) : new CreateSeries(s));
  }
}