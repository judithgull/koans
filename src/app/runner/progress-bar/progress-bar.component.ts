import { Component, Input } from '@angular/core';
import { Exercise, SeriesProgress } from '../../common/model';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent {
  @Input() exercises: Exercise[];

  @Input() userProgress: SeriesProgress;
}
