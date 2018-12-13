import { Component, OnInit } from '@angular/core';
import {
  SeriesFacade
} from '../../store';
import {
  ISeries,
  Series,
  Exercise,
  ProgrammingLanguages,
  ProgrammingLanguage
} from '../../model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-series-container',
  template: `
  <app-series-form
    [model]="series$ | async"
    [programmingLanguages]="programmingLanguages"
    (submitSeries)="submitSeries($event)">
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

  constructor(private seriesFacade: SeriesFacade) { }

  ngOnInit() {
    this.series$ = this.seriesFacade.selectedSeries$.pipe(
      map(s => {
        return s ? new Series({ ...s }) : this.createNewSeries();
      }));
  }

  private createNewSeries(): Series {
    const s = new Series();
    s.addItem(new Exercise());
    return s;
  }

  submitSeries(s: ISeries) {
    this.seriesFacade.upsert(s);
  }
}
