import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { CodeEditorModule } from '../code-editor/code-editor.module';
import { AppCommonModule } from '../common/common.module';
import { ExerciseNavButtonsComponent } from './exercise-nav-buttons/exercise-nav-buttons.component';
import { ExerciseTextComponent } from './exercise-text/exercise-text.component';
import { ProgressBarComponent } from './progress-bar/progress-bar.component';
import { RunExerciseCardComponent } from './run-exercise-card/run-exercise-card.component';
import { RunExerciseContainerComponent } from './run-exercise-container/run-exercise-container.component';
import { SeriesContainerComponent } from './series-container/series-container.component';
import { SeriesRunnerComponent } from './series-runner/series-runner.component';
import { MonacoLoadedGuard } from '../code-editor/monaco-loaded.guard';
import { SeriesExistsGuard } from '../common';
import { ExerciseSelectedGuard } from './exercise-selected.guard';
import { SeriesPageComponent } from './series-page/series-page.component';

const routes: Routes = [
  {
    path: 'series/:id',
    component: SeriesPageComponent,
    canActivate: [SeriesExistsGuard, MonacoLoadedGuard],
    children: [
      {
        pathMatch: 'full',
        path: 'e/:exId',
        component: RunExerciseContainerComponent,
        canActivate: [ExerciseSelectedGuard]
      },
      {
        pathMatch: 'full',
        path: '',
        redirectTo: 'e/1',
        canActivate: [ExerciseSelectedGuard]
      }
    ]
  },
  {
    path: 's/:id',
    component: SeriesContainerComponent,
    canActivate: [SeriesExistsGuard, MonacoLoadedGuard],
    children: [
      {
        pathMatch: 'full',
        path: 'e/:exId',
        component: RunExerciseContainerComponent,
        canActivate: [ExerciseSelectedGuard]
      },
      {
        pathMatch: 'full',
        path: '',
        redirectTo: 'e/1',
        canActivate: [ExerciseSelectedGuard]
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
    FormsModule
  ],
  declarations: [
    SeriesRunnerComponent,
    ProgressBarComponent,
    RunExerciseCardComponent,
    ExerciseTextComponent,
    ExerciseNavButtonsComponent,
    SeriesContainerComponent,
    RunExerciseContainerComponent,
    SeriesPageComponent
  ],
  providers: [SeriesExistsGuard]
})
export class RunnerModule {}
