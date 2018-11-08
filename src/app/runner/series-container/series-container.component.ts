import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ExerciseProgress, Feedback, ISeries } from '../../model';
import { AppState, SeriesQueries } from '../../store';
import { getSelectedProgresses, getSelectedProgress } from '../../store/editor-model';
import { SeriesFacade } from '../../store/series';


@Component({
  selector: 'app-series-container',
  templateUrl: './series-container.component.html'
})
export class SeriesContainerComponent implements OnInit {
  series$: Observable<ISeries>;
  progresses$: Observable<ExerciseProgress[]>;
  progress$: Observable<Feedback>;

  constructor(private store: Store<AppState>, private seriesFacade: SeriesFacade) { }

  ngOnInit() {
    this.series$ = this.seriesFacade.selectedSeries$;
    this.progresses$ =
      this.store.select(getSelectedProgresses)
        .pipe(
          distinctUntilChanged((a, b) => R.equals(a, b))
        );
    this.progress$ = this.store.select(getSelectedProgress);
  }
}
