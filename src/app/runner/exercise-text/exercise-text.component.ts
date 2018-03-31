import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { Exercise } from '../../model';

@Component({
  selector: 'app-exercise-text',
  template: `<div class="exercise-card-info">
                <h2 class="t-title-small exercise-title">{{ex?.title}}</h2>
                <p class="t-paragraph exercise-description">{{ex?.description}}</p>
            </div>`,
  styleUrls: ['./exercise-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseTextComponent {
  @Input() ex: Exercise;
}
