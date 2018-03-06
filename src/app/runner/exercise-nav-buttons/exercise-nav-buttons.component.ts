import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { ExerciseProgress } from '../../model';

@Component({
  selector: 'app-exercise-nav-buttons',
  template: `<button class="button button-prev" *ngIf="hasPrevious()" type="button" [routerLink]="['e', userProgress?.id -1]">Previous</button>
                <button class="button button-next" *ngIf="hasNext() && (userProgress?.solved || userProgress?.solutionRequested)" type="button"
                [routerLink]="['e', userProgress?.id + 1]">Next
            </button>`,
  styleUrls: ['./exercise-nav-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseNavButtonsComponent {
  @Input() userProgress: ExerciseProgress;
  @Input() exerciseCount: number;

  hasPrevious(): boolean {
    return this.userProgress && this.userProgress.id > 1;
  }

  hasNext(): boolean {
    return this.userProgress && this.userProgress.id < this.exerciseCount;
  }
}
