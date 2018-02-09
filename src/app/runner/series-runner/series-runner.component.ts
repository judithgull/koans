import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Store } from '@ngrx/store';
import { ExerciseProgress, SeriesProgress, ISeries } from '../../common/model';

@Component({
  selector: 'app-series-runner',
  template: `
  <h1 class="t-title main-title">{{series?.title}}</h1>
  <app-progress-bar
    [userProgress]="progresses">
  </app-progress-bar>
  <div class="programming-lang-wrap">
    <app-series-icon
      [programmingLanguage]="series?.programmingLanguage"
      light="true">
    </app-series-icon>
    <div class="exercise-card">
      <router-outlet #o="outlet"></router-outlet>
      <app-exercise-nav-buttons
        [userProgress]="progress"
        [exerciseCount]="series?.items.length">
      </app-exercise-nav-buttons>
    </div>
  </div>`,
  styleUrls: ['./series-runner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesRunnerComponent {
  @Input() series: ISeries;
  @Input() progresses: ExerciseProgress[];
  @Input() progress: ExerciseProgress;
}
