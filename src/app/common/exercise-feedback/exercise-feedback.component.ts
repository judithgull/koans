import { Component, OnInit, Input } from '@angular/core';

/**
 * Component to display feedback like errors and success messages.
 */
@Component({
  selector: 'app-exercise-feedback',
  templateUrl: './exercise-feedback.component.html',
  styleUrls: ['./exercise-feedback.component.scss']
})
export class ExerciseFeedbackComponent {
  @Input() feedback: any;
}
