import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { ModelValueChange, createResultAction, ModelToggleSolutionAction } from './editor-model.action';
import { ModelState, Feedback, SourceType, ErrorMarker, ExerciseKey, ExerciseProgress } from '../../model';
import { EditorModelQueries } from './editor-model.reducer';
import { filter, map, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as R from 'ramda';

@Injectable({
  providedIn: 'root',
})
export class EditorModelFacade {
  selectedProgress$ = this.store.select(EditorModelQueries.getSelectedProgress);

  errors$ = this.selectedProgress$
      .pipe(
        map(f => {
          if (f && f.validation && !f.validation.success) {
            return f.validation.errors;
          } else if (f && f.monaco && !f.monaco.success) {
            return f.monaco.errors;
          } else if (f && f.execution && !f.execution.success) {
            return f.execution.errors;
          }
          return [];
        })
      );
  distinctProgresses$: Observable<ExerciseProgress[]> = this.store.select(EditorModelQueries.getSelectedProgresses)
  .pipe(
    distinctUntilChanged((a, b) => R.equals(a, b))
  );;

  constructor(private store: Store<AppState>) { }

  update(value: ModelState) {
    this.store.dispatch(new ModelValueChange(value));
  }

  getValidationResult(id: string, version): Observable<Feedback> {
    return this.store
      .select(EditorModelQueries.getValidationResult(id))
      .pipe(
        filter(e => e && e.validation && true),
        filter(e => e.versionId === version)
      );
  }

  updateMonacoResult(value: ModelState, errors: ErrorMarker[]) {
    this.store.dispatch(
      createResultAction(SourceType.monaco, value, errors)
    );
  }

  toggleSolution(exerciseKey: ExerciseKey) {
    this.store.dispatch(
      new ModelToggleSolutionAction(exerciseKey)
    );
  }

}
