import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CodeEditorModule } from '../code-editor/code-editor.module';
import { AppCommonModule } from '../common/common.module';
import { ExerciseNavButtonsComponent } from './exercise-nav-buttons/exercise-nav-buttons.component';
import { ExerciseTextComponent } from './exercise-text/exercise-text.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RunExerciseCardComponent } from './run-exercise-card/run-exercise-card.component';
import { RunExerciseContainerComponent } from './run-exercise-container/run-exercise-container.component';
import { SeriesContainerComponent } from './series-container/series-container.component';
import { SeriesProgressExistsGuard } from './series-progress.guard';
import { SeriesRunnerComponent } from './series-runner/series-runner.component';
import { effects, reducers } from './store';
import { MonacoLoadedGuard } from '../code-editor/monaco-loaded.guard';
import { JsLibsGuard } from '../code-editor/js-libs.guard';

const routes: Routes = [
  {
    path: 'series/:id',
    component: SeriesContainerComponent,
    canActivate: [SeriesProgressExistsGuard, MonacoLoadedGuard, JsLibsGuard],
    children: [
      {
        pathMatch: 'full',
        path: 'e/:exId',
        component: RunExerciseContainerComponent
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
    StoreModule.forFeature('runner', reducers),
    EffectsModule.forFeature(effects)
  ],
  declarations: [
    SeriesRunnerComponent,
    ProgressBarComponent,
    RunExerciseCardComponent,
    ExerciseTextComponent,
    ExerciseNavButtonsComponent,
    SeriesContainerComponent,
    RunExerciseContainerComponent
  ],
  providers: [SeriesProgressExistsGuard]
})
export class RunnerModule {}
