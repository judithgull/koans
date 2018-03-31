import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { combineReducers, StoreModule } from '@ngrx/store';

import * as editorStore from '../../code-editor/store';
import { AppCommonModule } from '../../common/common.module';
import { mockSeries } from '../../common/test/series.mock';
import { Exercise } from '../../model/exercise';
import * as rootStore from '../../store';
import * as runnerStore from '../store';
import { RunExerciseCardComponent } from './run-exercise-card.component';

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
      value: '',
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
