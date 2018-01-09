import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrls: ['./tab-item.component.scss']
})
export class TabItemComponent {

  @Input()
  tabId: number;

  @Input()
  text: string;

  @Input()
  selectedTabId: number;

  @Output()
  selectedTabIdChange: EventEmitter<number> = new EventEmitter<number>();

  select() {
    this.selectedTabId = this.tabId;
    this.selectedTabIdChange.emit(this.tabId);
  }

  get selected(){
    return this.selectedTabId === this.tabId;
  }

}
