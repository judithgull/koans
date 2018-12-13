import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ExerciseProgress, Feedback, ISeries } from '../../model';
import { SeriesFacade } from '../../store/series';
import { EditorModelFacade } from '../../store/editor-model/editor-model.facade';


@Component({
  selector: 'app-series-container',
  templateUrl: './series-container.component.html'
})
export class SeriesContainerComponent implements OnInit {
  series$: Observable<ISeries>;
  progresses$: Observable<ExerciseProgress[]>;
  progress$: Observable<Feedback>;

  constructor(
    private seriesFacade: SeriesFacade,
    private editorModelFacade:EditorModelFacade) { }

  ngOnInit() {
    this.series$ = this.seriesFacade.selectedSeries$;
    this.progresses$ = this.editorModelFacade.distinctProgresses$;
    this.progress$ = this.editorModelFacade.selectedProgress$;
  }
}
