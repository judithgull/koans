import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesContainerComponent } from './series-container.component';
import { SeriesFormComponent } from '../series-form/series-form.component';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../../common/common.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';
import { EffectsModule } from '@ngrx/effects';

describe('SeriesContainerComponent', () => {
  let component: SeriesContainerComponent;
  let fixture: ComponentFixture<SeriesContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SeriesContainerComponent,
          SeriesFormComponent,
          ExerciseFormComponent
        ],
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          AppCommonModule,
          CodeEditorModule,
          StoreModule.forRoot({
            ...rootStore.reducers
          }),
          EffectsModule.forRoot([])
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
