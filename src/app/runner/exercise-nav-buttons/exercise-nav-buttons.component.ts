import { Component, Input } from '@angular/core';
import { ExerciseUserProgress } from '../../common/model/exercise';

@Component({
  selector: 'app-exercise-nav-buttons',
  template: `<button class="button button-prev" *ngIf="hasPrevious()" type="button" [routerLink]="['e', exId - 1]">Previous</button>
                <button class="button button-next" *ngIf="hasNext() && (userProgress?.solved || userProgress?.solutionRequested)" type="button"
                [routerLink]="['e', exId + 1]">Next
            </button>`,
  styleUrls: ['./exercise-nav-buttons.component.scss']
})
export class ExerciseNavButtonsComponent {
  @Input() userProgress: ExerciseUserProgress;
  @Input() exId: number;
  @Input() exerciseCount: number;

  hasPrevious(): boolean {
    return this.exId > 1;
  }

  hasNext(): boolean {
    return this.exId < this.exerciseCount;
  }
}
