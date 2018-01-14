import { Store } from '@ngrx/store';
import {
  animate,
  query,
  style,
  transition,
  trigger,
  keyframes
} from '@angular/animations';
import { Feedback, FeedbackType } from '../../common/model/feedback';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as st from '../store';
import { Exercise, ExerciseInfo } from '../../common/model/exercise';
import { ExerciseUserState } from '../store/reducers/exercise.reducer';

const cardTransition = trigger('cardTransition', [
  transition('* -> *', [
    animate(
      10000,
      keyframes([
        style({ opacity: 1, transform: 'translateX(-500%)', offset: 0.49 }),
        style({ opacity: 0, transform: 'translateX(500%)', offset: 0.5 }),
        style({ opacity: 1, transform: 'translateX(-500%)', offset: 0.51 })
      ])
    )
  ])
]);

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss'],
  animations: [cardTransition]
})
export class RunExerciseCardComponent implements OnInit {
  exercise: ExerciseInfo;
  ex$: Store<Exercise>;
  userState$: Store<ExerciseUserState>;

  solutionVisible = false;
  userSolution = '';

  feedback: Feedback[] = [];

  private editableMarkerFeedback: Feedback[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<st.RunnerState>
  ) {}

  ngOnInit(): void {
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.userState$ = this.store.select(st.getExerciseUserState);

    this.route.data.subscribe((data: { exercise: ExerciseInfo }) => {
      this.exercise = data.exercise;
      this.userSolution = data.exercise.exercise;
    });

    this.feedback.push({
      type: FeedbackType.Error,
      message: 'Please replace ??? with the correct answer!',
      source: '???',
      startLineNumber: 0
    });
  }

  next() {
    this.navigate(this.exercise.sortOrder + 1);
  }

  previous() {
    this.navigate(this.exercise.sortOrder - 1);
  }

  navigate(exId: number) {
    this.router.navigate(['e', exId], {
      relativeTo: this.route.parent
    });
  }

  toggleSolution() {
    this.solutionVisible = !this.solutionVisible;
    this.exercise.solutionRequested = true;
  }

  updateFeedback(feedback: Feedback[]) {
    this.feedback = feedback;
    const isSuccess = feedback.some(
      f => f.type === FeedbackType.Info && f.message === 'Success'
    );
    if (isSuccess) {
      this.exercise.solved = true;
      if (this.exercise.hasNext) {
        this.next();
      }
    }
  }
}
