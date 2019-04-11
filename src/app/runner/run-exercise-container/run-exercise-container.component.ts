import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { IExercise, ISeries, Feedback, ErrorMarker } from '../../model';
import { SeriesFacade } from '../../store/series/series.facade';
import { EditorModelFacade } from '../../store/editor-model/editor-model.facade';

@Component({
  selector: 'app-run-exercise-container',
  template: `
    <app-run-exercise-card
      [ex]="ex$ | async"
      [progress]="progress$ | async"
      [errors]="errors$ | async"
      [series]="series$ | async"
    >
    </app-run-exercise-card>
  `
})
export class RunExerciseContainerComponent implements OnInit {
  ex$: Observable<IExercise>;
  progress$: Observable<Feedback>;
  errors$: Observable<ErrorMarker[]>;
  series$: Observable<ISeries>;

  constructor(
    private seriesFacade: SeriesFacade,
    private editorModelFacade: EditorModelFacade
  ) {}

  ngOnInit() {
    this.ex$ = this.seriesFacade.selectedExercise$;
    this.progress$ = this.editorModelFacade.selectedProgress$;
    this.series$ = this.seriesFacade.selectedSeries$;
    this.errors$ = this.editorModelFacade.errors$;
  }
}
