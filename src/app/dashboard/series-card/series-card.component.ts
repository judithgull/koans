import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProgrammingLanguage } from '../../common/model/programming-language';

@Component({
  selector: 'app-series-card',
  templateUrl: './series-card.component.html',
  styleUrls: ['./series-card.component.scss']
})
export class SeriesCardComponent {
  @Input() series: any;

  @Output() remove = new EventEmitter<number>();

  @Input() userId: string;

  constructor(private router: Router) {}

  delete(id: number) {
    this.remove.emit(id);
  }

  edit(id: string) {
    this.router.navigate(['editor', id]);
  }

  isEditable(authorId: string) {
    return this.userId === authorId;
  }

  showDetails(id: string) {
    this.router.navigate(['series', id]);
  }
}
