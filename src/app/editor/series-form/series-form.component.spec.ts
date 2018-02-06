import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { HttpClientModule } from '@angular/common/http';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { CodeEditorComponent } from '../../code-editor/code-editor.component';
import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppCommonModule } from '../../common/common.module';
import { SeriesFormComponent } from './series-form.component';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';
import { RouterTestingModule } from '@angular/router/testing';

describe('SeriesFormComponent', () => {
  let component: SeriesFormComponent;
  let fixture: ComponentFixture<SeriesFormComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SeriesFormComponent, ExerciseFormComponent],
        imports: [
          CommonModule,
          FormsModule,
          ReactiveFormsModule,
          AppCommonModule,
          CodeEditorModule,
          HttpClientModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...rootStore.reducers
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should initialize with single item', () => {
    expect(component).toBeTruthy();
    expect(component.model.items.length).toBe(1);
  });

  it('should add an exercise', () => {
    component.addExercise();
    expect(component.model.items.length).toBe(2);
  });

  it('should remove an exercise', () => {
    component.addExercise();
    component.removeExercise(0);
    expect(component.model.items.length).toBe(1);
  });
});
