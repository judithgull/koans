import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { mockSeries } from '../../common/test/series.mock';
import { RunExerciseCardComponent } from './run-exercise-card.component';
import { Exercise } from '../../model/exercise';
import { CodeEditorModule } from '../../code-editor/code-editor.module';

import { StoreModule, combineReducers } from '@ngrx/store';

import { AppCommonModule } from '../../common/common.module';
import * as rootStore from '../../store';
import * as runnerStore from '../store';
import * as editorStore from '../../code-editor/store';
import { EffectsModule } from '@ngrx/effects';

describe('RunExerciseCardComponent', () => {
  let component: RunExerciseCardComponent;
  let fixture: ComponentFixture<RunExerciseCardComponent>;

  const testLanguage = 'testLang';
  const e: Exercise = mockSeries[0].items[0];

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RunExerciseCardComponent],
        imports: [
          AppCommonModule,
          CodeEditorModule,
          ReactiveFormsModule,
          FormsModule,
          StoreModule.forRoot({
            ...rootStore.reducers,
            runner: combineReducers(runnerStore.reducers),
            editorModel: combineReducers(editorStore.editorModelReducer)
          }),
          EffectsModule.forRoot([])
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RunExerciseCardComponent);
    component = fixture.componentInstance;
    component.progress = {
      userSolution: '',
      id: 1,
      solutionRequested: false,
      solutionVisible: false,
      solved: false
    };
    component.series = mockSeries[0];
    component.ex = component.series.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
