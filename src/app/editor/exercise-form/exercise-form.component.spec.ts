import { AppCommonModule } from '../../common/common.module';
import { Exercise } from '../../common/model/exercise';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormComponent } from './exercise-form.component';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as rootStore from '../../store';
import { EffectsModule } from '@ngrx/effects';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExerciseFormComponent],
        imports: [
          ReactiveFormsModule,
          CodeEditorModule,
          AppCommonModule,
          StoreModule.forRoot({
            ...rootStore.reducers
          }),
          EffectsModule.forRoot([])
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFormComponent);
    component = fixture.componentInstance;
    component.item = new Exercise();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
