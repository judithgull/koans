import { Component, Input, ViewContainerRef } from '@angular/core';

import { Series } from '../../common/model/series';
import { SeriesService } from '../../common/series.service';
import { Store } from '@ngrx/store';
import { State, DeleteSeries } from '../../store/index';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-series-card-list',
  templateUrl: './series-card-list.component.html'
})
export class SeriesCardListComponent {
  @Input() userId: string;

  @Input() seriesList: Series[];

  constructor(
    private seriesService: SeriesService,
    private toastr: ToastrService,
    vcr: ViewContainerRef,
    private store: Store<State>
  ) {}

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }

  /**
   * Remove item with id locally
   * @param id
   */
  onRemove(id: string) {
    this.store.dispatch(new DeleteSeries(id));

    /*    this.seriesService.delete(id).subscribe(
      observer => {
        this.seriesList = this.seriesList.filter(item => item._id !== id);
      },
      error => this.showError(error)
    );
    */
  }
}
