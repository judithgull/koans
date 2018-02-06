import { Component, Input } from '@angular/core';
import { Series } from '../../common/model/series';
import { Store } from '@ngrx/store';
import { State, DeleteSeries } from '../../store/index';

@Component({
  selector: 'app-series-card-list',
  templateUrl: './series-card-list.component.html'
})
export class SeriesCardListComponent {
  @Input() userId: string;

  @Input() seriesList: Series[];

  constructor(private store: Store<State>) {}

  /**
   * Remove item with id locally
   * @param id
   */
  onRemove(id: string) {
    this.store.dispatch(new DeleteSeries(id));
  }
}
