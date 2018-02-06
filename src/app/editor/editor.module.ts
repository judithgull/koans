import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { SeriesFormComponent } from './series-form/series-form.component';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { SeriesExistsGuard } from './series.guard';
import { SeriesContainerComponent } from './series-container/series-container.component';

const routes: Routes = [
  {
    path: 'editor/:id',
    component: SeriesContainerComponent,
    pathMatch: 'full',
    canActivate: [SeriesExistsGuard]
  },
  {
    path: 'editor',
    component: SeriesContainerComponent,
    pathMatch: 'full'
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
    SeriesContainerComponent
  ],
  providers: [SeriesExistsGuard]
})
export class EditorModule {}
