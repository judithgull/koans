import { Component, Input, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr';

import { Series } from '../../common/model/series';
import { SeriesService } from '../../common/series.service';
import { Store } from '@ngrx/store';
import { State, DeleteSeries } from '../../store/index';

@Component({
  selector: 'app-series-card-list',
  templateUrl: './series-card-list.component.html'
})
export class SeriesCardListComponent {
  @Input() userId: string;

  @Input() seriesList: Series[];

  constructor(
    private seriesService: SeriesService,
    private toastr: ToastsManager,
    vcr: ViewContainerRef,
    private store: Store<State>
  ) {
    this.toastr.setRootViewContainerRef(vcr);
  }

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
