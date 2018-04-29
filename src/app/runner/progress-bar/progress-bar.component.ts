import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {  ExerciseProgress } from '../../model';

@Component({
  selector: 'app-progress-bar',
  template: `
  <div class="progress-bar" *ngIf="progresses">
    <div class="progress-bar-item" *ngFor="let p of progresses; let i = index">
      <a class="progress-bar-item--link" *ngIf="p"
       [routerLink]="['e', i + 1]"
       [routerLinkActive]="['isActive']"
       [ngClass]="{isSolved: p.solved, isNotSolved: p.solutionRequested}">
          <span class="l-centred">{{ i + 1 }}</span>
      </a>
    </div>
  </div>`,
  styleUrls: ['./progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgressBarComponent {
  @Input() progresses: ExerciseProgress[];
}
