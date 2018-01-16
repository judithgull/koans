import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  @Output() valueChange = new EventEmitter<string>();

  searchTextChange(value) {
    this.valueChange.emit(value);
  }
}
