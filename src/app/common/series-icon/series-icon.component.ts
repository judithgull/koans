import { Component, Input, OnInit } from '@angular/core';
import { ProgrammingLanguage } from '../model/programming-language';

@Component({
  selector: 'app-series-icon',
  templateUrl: './series-icon.component.html',
  styleUrls: ['./series-icon.component.scss']
})
export class SeriesIconComponent {
  @Input() programmingLanguage: ProgrammingLanguage;
  @Input() light = false;

  private sources = {
    typescript: 'assets/icon-typescript.svg',
    javascript: 'assets/icon-javascript.svg'
  };

  get icon() {
    return this.sources[this.programmingLanguage];
  }
}
