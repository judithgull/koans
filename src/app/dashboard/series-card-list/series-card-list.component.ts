import { Component, Input } from '@angular/core';

import { Series } from '../../model/series';
import { SeriesFacade } from '../../store';

@Component({
  selector: 'app-series-card-list',
  templateUrl: './series-card-list.component.html'
})
export class SeriesCardListComponent {
  @Input() userId: string;

  @Input() seriesList: Series[];

  constructor(private seriesFacade: SeriesFacade) {}

  onRemove(id: string) {
    this.seriesFacade.remove(id);
  }
}
