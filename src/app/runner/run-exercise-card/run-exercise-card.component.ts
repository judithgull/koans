import { Store } from '@ngrx/store';
import {
  Feedback,
  FeedbackType,
  Exercise,
  ExerciseProgress,
  ISeries
} from '../../common/model';
import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as st from '../../store';
import * as rst from '../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent implements OnInit, OnChanges {
  @Input() ex: Exercise;

  @Input() progress: ExerciseProgress;

  @Input() series: ISeries;

  userValue = '';
  programmingLanguage;

  feedback: Feedback[] = [];
  seriesLength: number = 0;

  private editableMarkerFeedback: Feedback[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<st.State>
  ) {}

  ngOnInit(): void {
    this.userValue = this.progress.userSolution;
    this.seriesLength = this.series.items.length;
    this.programmingLanguage = this.series.programmingLanguage;

    this.feedback.push({
      type: FeedbackType.Error,
      message: 'Please replace ??? with the correct answer!',
      source: '???',
      startLineNumber: 0
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.progress &&
      changes.progress.currentValue &&
      changes.progress.previousValue &&
      changes.progress.currentValue.id !== changes.progress.previousValue.id
    ) {
      this.userValue = changes.progress.currentValue.userSolution;
    }
  }

  navigate(exId: number) {
    this.router.navigate(['e', exId], {
      relativeTo: this.route.parent
    });
  }

  toggleSolution() {
    this.store.dispatch(
      new rst.ToggleSolutionVisible({
        seriesId: this.series._id,
        id: this.ex.sortOrder
      })
    );
  }

  updateFeedback(feedback: Feedback[]) {
    this.feedback = feedback;
    const isSuccess = feedback.some(
      f => f.type === FeedbackType.Info && f.message === 'Success'
    );
    if (isSuccess) {
      // TODO get user solution from feedback
      this.store.dispatch(
        new rst.ExerciseSolved({
          seriesId: this.series._id,
          id: this.ex.sortOrder,
          userSolution: this.userValue
        })
      );
      // TODO NAVIGATE TO NEXT
      if (this.ex.sortOrder < this.seriesLength) {
        this.navigate(this.ex.sortOrder + 1);
      }
    }
  }
}
