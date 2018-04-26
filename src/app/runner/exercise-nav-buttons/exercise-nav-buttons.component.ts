import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ExerciseKey, Feedback } from '../../model';

@Component({
  selector: 'app-exercise-nav-buttons',
  template: `<button class="button button-prev" *ngIf="hasPrevious()" type="button" [routerLink]="['e', exerciseId -1]">Previous</button>
                <button class="button button-next" *ngIf="hasNext() && (progress?.valid || progress?.solutionRequested)" type="button"
                [routerLink]="['e', exerciseId + 1]">Next
            </button>`,
  styleUrls: ['./exercise-nav-buttons.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseNavButtonsComponent {
  @Input() progress: Feedback;
  @Input() exerciseCount: number;

  get exerciseId() {
    if (!this.progress) {
      return 0;
    }
    return ExerciseKey.from(this.progress.id).exerciseId;
  }

  hasPrevious(): boolean {
    return this.exerciseId > 1;
  }

  hasNext(): boolean {
    return this.exerciseId < this.exerciseCount;
  }
}
