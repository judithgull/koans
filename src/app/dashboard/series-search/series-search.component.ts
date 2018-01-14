import { HttpParams } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { ISeries } from '../../common/model/series';
import { SeriesService } from '../../common/series.service';

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.scss'],
  providers: [SeriesService]
})
export class SeriesSearchComponent implements OnInit {
  @Input() isLoggedIn;

  @Input() userId: string;

  seriesList: ISeries[];
  message = '';
  searchText: string;
  authorId: string;
  searchParamChange = new EventEmitter<HttpParams>();

  constructor(private seriesService: SeriesService) {}

  ngOnInit() {
    this.searchParamChange.debounceTime(500).subscribe(e => this.search(e));
    this.search(this.getSearchParams());
  }

  private search(params: HttpParams) {
    this.seriesService
      .getSeries(params)
      .subscribe(
        seriesList => (this.seriesList = seriesList),
        err => (this.message = 'Error: Data cannot be loaded.')
      );
  }

  updateSearchFilter(authEvent) {
    this.authorId = authEvent.authorId;
    this.emitParamChange();
  }

  emitParamChange() {
    this.searchParamChange.emit(this.getSearchParams());
  }

  getSearchParams(): HttpParams {
    let params = new HttpParams();

    if (this.searchText) {
      params = params.append('search', this.searchText);
    }
    if (this.authorId) {
      params = params.append('authorId', this.authorId);
    }

    return params;
  }

  updateSearchText(searchText: string) {
    this.searchText = searchText;
    this.emitParamChange();
  }
}
