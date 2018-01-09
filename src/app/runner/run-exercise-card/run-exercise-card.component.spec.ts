import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';

import { mockSeries } from '../../common/test/series.mock';
import { RunExerciseCardComponent } from './run-exercise-card.component';
import { ExerciseInfo, Exercise } from '../../common/model/exercise';
import { CodeEditorModule } from '../../code-editor/code-editor.module';

describe('RunExerciseCardComponent', () => {
  let component: RunExerciseCardComponent;
  let fixture: ComponentFixture<RunExerciseCardComponent>;

  const testLanguage = 'testLang';
  const e: Exercise = mockSeries[0].items[0];

  class ActivatedRouteMock {
    snapshot = {
      data: {
        exercise: new ExerciseInfo(e, testLanguage, true, false)
      }
    };
  }

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RunExerciseCardComponent],
        imports: [
          RouterTestingModule,
          CodeEditorModule,
          ReactiveFormsModule,
          FormsModule
        ],
        providers: [
          {
            provide: ActivatedRoute,
            useClass: ActivatedRouteMock
          }
        ],
        schemas: [NO_ERRORS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RunExerciseCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.exercise.programmingLanguage).toEqual(testLanguage);
  });
});
