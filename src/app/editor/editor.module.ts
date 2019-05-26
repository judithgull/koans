import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule, SeriesExistsGuard } from '../common';
import { SeriesFormComponent } from './series-form/series-form.component';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { SeriesFormContainerComponent } from './series-container/series-form-container.component';
import { MonacoLoadedGuard } from '../code-editor/monaco-loaded.guard';
import { SeriesDeselectedGuard } from './series-deselected.guard';

const routes: Routes = [
  {
    path: 'editor/:id',
    component: SeriesFormContainerComponent,
    pathMatch: 'full',
    canActivate: [SeriesExistsGuard, MonacoLoadedGuard]
  },
  {
    path: 'editor',
    component: SeriesFormContainerComponent,
    pathMatch: 'full',
    canActivate: [SeriesDeselectedGuard, MonacoLoadedGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AppCommonModule,
    CodeEditorModule
  ],
  declarations: [
    SeriesFormComponent,
    ExerciseFormComponent,
    SeriesFormContainerComponent
  ],
  providers: [SeriesExistsGuard]
})
export class EditorModule {}
