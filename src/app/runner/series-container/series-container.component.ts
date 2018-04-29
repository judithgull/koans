import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as R from 'ramda';
import { Observable } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

import { ExerciseProgress, Feedback, ISeries } from '../../model';
import * as st from '../../store';


@Component({
  selector: 'app-series-container',
  templateUrl: './series-container.component.html'
})
export class SeriesContainerComponent implements OnInit {
  series$: Store<ISeries>;
  progresses$: Observable<ExerciseProgress[]>;
  progress$: Store<Feedback>;

  constructor(private store: Store<st.State>) { }

  ngOnInit() {
    this.series$ = this.store.select(st.getSelectedSeries);
    this.progresses$ =
      this.store.select(st.getSelectedProgresses)
        .pipe(
          distinctUntilChanged((a, b) => R.equals(a, b))
        );
    this.progress$ = this.store.select(st.getSelectedProgress);
  }
}
