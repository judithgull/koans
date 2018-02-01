import { Subscription } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import {
  Feedback,
  FeedbackType,
  Exercise,
  ExerciseProgress,
  ISeries
} from '../../common/model';
import { Component, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as st from '../../store';
import * as rst from '../store';

@Component({
  selector: 'app-run-exercise-card',
  templateUrl: './run-exercise-card.component.html',
  styleUrls: ['./run-exercise-card.component.scss']
})
export class RunExerciseCardComponent implements OnInit, OnDestroy {
  ex$: Store<Exercise>;
  userState$: Store<ExerciseProgress>;
  series$: Store<ISeries>;

  userValue = '';
  programmingLanguage;

  feedback: Feedback[] = [];
  seriesLength: number = 0;
  subs: Subscription[];

  private editableMarkerFeedback: Feedback[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<st.State>
  ) {}

  ngOnInit(): void {
    this.ex$ = this.store.select(st.getSelectedExercise);
    this.userState$ = this.store.select(rst.getSelectedUserState);
    this.series$ = this.store.select(st.getSelectedSeries);

    this.subs = [
      this.series$.subscribe(s => {
        if (s) {
          this.seriesLength = s.items.length;
          this.programmingLanguage = s.programmingLanguage;
        }
      }),
      this.userState$.subscribe(userState => {
        if (userState) {
          this.userValue = userState.userSolution;
        }
      })
    ];

    this.feedback.push({
      type: FeedbackType.Error,
      message: 'Please replace ??? with the correct answer!',
      source: '???',
      startLineNumber: 0
    });
  }

  public ngOnDestroy(): void {
    this.subs.map(s => s.unsubscribe());
  }

  navigate(exId: number) {
    this.router.navigate(['e', exId], {
      relativeTo: this.route.parent
    });
  }

  toggleSolution() {
    this.store.dispatch(
      new rst.ToggleSolutionVisible({
        seriesId: this.getSeriesId(),
        id: this.getExId()
      })
    );
  }

  private getExId(): number {
    return parseInt(this.route.snapshot.params.exId, 10);
  }

  private getSeriesId() {
    return this.route.parent.snapshot.params.id;
  }

  updateFeedback(feedback: Feedback[]) {
    this.feedback = feedback;
    const isSuccess = feedback.some(
      f => f.type === FeedbackType.Info && f.message === 'Success'
    );
    if (isSuccess) {
      // TODO get user solution from feedback
      const exId = this.getExId();
      this.store.dispatch(
        new rst.ExerciseSolved({
          seriesId: this.getSeriesId(),
          id: exId,
          userSolution: this.userValue
        })
      );
      if (exId < this.seriesLength) {
        this.navigate(exId + 1);
      }
    }
  }
}
