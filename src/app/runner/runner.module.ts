import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeEditorModule } from '../code-editor/code-editor.module';
import { AppCommonModule } from '../common/common.module';
import { ExerciseResolve } from './exercise.resolve';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RunExerciseCardComponent } from './run-exercise-card/run-exercise-card.component';
import { SeriesRunnerComponent } from './series-runner/series-runner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';

const routes: Routes = [
  {
    path: 'series/:id',
    component: SeriesRunnerComponent,
    children: [
      {
        pathMatch: 'full',
        path: 'e/:exId',
        component: RunExerciseCardComponent,

        resolve: {
          exercise: ExerciseResolve
        },
        data: {
          animation: {
            value: ':exId'
          }
        }
      },
      {
        pathMatch: 'full',
        path: '',
        redirectTo: 'e/1'
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppCommonModule,
    CodeEditorModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('runner', reducers)
  ],
  providers: [ExerciseResolve],
  declarations: [
    SeriesRunnerComponent,
    ProgressBarComponent,
    RunExerciseCardComponent
  ]
})
export class RunnerModule {}
