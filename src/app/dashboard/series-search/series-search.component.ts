import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import * as st from '../../store';
import { SearchParams } from '../../model/search.params';
import { ISeries } from '../../model/series';

@Component({
  selector: 'app-series-search',
  templateUrl: './series-search.component.html',
  styleUrls: ['./series-search.component.scss']
})
export class SeriesSearchComponent implements OnInit {
  @Input() isLoggedIn;

  @Input() userId: string;

  message = '';
  searchText: string;
  authorId: string;
  searchParamChange = new EventEmitter<SearchParams>();
  showOwnSeries = false;

  constructor(private store: Store<st.State>) {}

  ngOnInit() {
    this.searchParamChange.debounceTime(500).subscribe(e => this.search(e));
    this.search(this.getSearchParams());
  }

  private search(params: SearchParams) {
    this.store.dispatch(new st.QuerySeries(params));
  }

  get seriesList$(): Store<ISeries[]> {
    if (this.showOwnSeries) {
      return this.store.select(st.getOwnSeries(this.authorId));
    }
    return this.store.select(st.getAllSeries);
  }

  updateSearchFilter(authEvent) {
    this.authorId = authEvent.authorId;
    this.emitParamChange();
  }

  emitParamChange() {
    const params = this.getSearchParams();
    this.searchParamChange.emit(params);
    this.showOwnSeries = params.authorId ? true : false;
  }

  getSearchParams(): SearchParams {
    return {
      searchText: this.searchText,
      authorId: this.authorId
    };
  }

  updateSearchText(searchText: string) {
    this.searchText = searchText;
    this.emitParamChange();
  }
}
