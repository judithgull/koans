import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss']
})
export class SearchFilterComponent {
  selectedTabId = 0;

  @Input() userId: string;

  @Output()
  valueChange: EventEmitter<{ authorId?: string }> = new EventEmitter<{
    authorId?: string;
  }>();

  handleSelectionChange() {
    if (this.selectedTabId === 0) {
      this.valueChange.emit({});
    } else {
      this.valueChange.emit({ authorId: this.userId });
    }
  }
}
