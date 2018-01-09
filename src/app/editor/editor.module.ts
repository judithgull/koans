import { CodeEditorComponent } from '../code-editor/code-editor.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppCommonModule } from '../common/common.module';
import { SeriesFormComponent } from './series-form/series-form.component';
import { CodeEditorModule } from '../code-editor/code-editor.module';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import { SeriesResolver } from './series.resolver';

const routes: Routes = [
  {
    path: 'editor/:id',
    component: SeriesFormComponent,
    pathMatch: 'full',
    resolve: {
      series: SeriesResolver
    }
  },
  { path: 'editor', component: SeriesFormComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    AppCommonModule,
    CodeEditorModule
  ],
  declarations: [SeriesFormComponent, ExerciseFormComponent],
  providers: [SeriesResolver]
})
export class EditorModule {}
