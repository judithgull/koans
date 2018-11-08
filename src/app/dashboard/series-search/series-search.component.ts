import { Component, EventEmitter, Input, OnInit } from '@angular/core';
import { debounceTime } from 'rxjs/operators';

import { SearchParams } from '../../model/search.params';
import { ISeries } from '../../model/series';
import { Observable } from 'rxjs';
import { SeriesFacade } from '../../store/series/series.facade';

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

  constructor(private seriesFacade:SeriesFacade) { }

  ngOnInit() {
    this.searchParamChange
      .pipe(debounceTime(500))
      .subscribe(e => this.search(e));
    this.search(this.getSearchParams());
  }

  private search(params: SearchParams) {
    this.seriesFacade.search(params);
  }

  get seriesList$(): Observable<ISeries[]> {
    if (this.showOwnSeries) {
      return this.seriesFacade.getByAuthorId(this.authorId);
    }
    return this.seriesFacade.allSeries$;
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
