import { Component, Input, OnInit } from '@angular/core';
import { ISeries } from '../../model/series';
import { Observable } from 'rxjs';
import { SeriesFacade } from '../../store/series/series.facade';

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.scss']
})
export class SeriesSearchComponent implements OnInit {
  @Input() userId: string;

  seriesList$: Observable<ISeries[]> = this.seriesFacade.allSeries$;

  message = 'Nothing here yet.';

  constructor(private seriesFacade: SeriesFacade) {}

  ngOnInit() {
    this.seriesFacade.search({
      searchText: '',
      authorId: this.userId
    });
  }
}
