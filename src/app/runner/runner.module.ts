import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CodeEditorModule } from '../code-editor/code-editor.module';
import { AppCommonModule } from '../common/common.module';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RunExerciseCardComponent } from './run-exercise-card/run-exercise-card.component';
import { SeriesRunnerComponent } from './series-runner/series-runner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { reducers } from './store';
import { ExerciseTextComponent } from './exercise-text/exercise-text.component';
import { ExerciseNavButtonsComponent } from './exercise-nav-buttons/exercise-nav-buttons.component';
import { SeriesProgressExistsGuard } from './series-progress.guard';

const routes: Routes = [
  {
    path: 'series/:id',
    component: SeriesRunnerComponent,
    canActivate: [SeriesProgressExistsGuard],
    children: [
      {
        pathMatch: 'full',
        path: 'e/:exId',
        component: RunExerciseCardComponent
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
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('runner', reducers)
  ],
  declarations: [
    SeriesRunnerComponent,
    ProgressBarComponent,
    RunExerciseCardComponent,
    ExerciseTextComponent,
    ExerciseNavButtonsComponent
  ],
  providers: [SeriesProgressExistsGuard]
})
export class RunnerModule {}
