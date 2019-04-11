import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../../common/common.module';
import { testFeedback } from '../../common/test';
import { mockSeries } from '../../common/test/series.mock';
import * as st from '../../store';
import { RunExerciseCardComponent } from './run-exercise-card.component';
import { IExercise } from '../../model';

describe('RunExerciseCardComponent', () => {
  let component: RunExerciseCardComponent;
  let fixture: ComponentFixture<RunExerciseCardComponent>;
  const e: IExercise = mockSeries[0].items[0];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RunExerciseCardComponent],
      imports: [
        AppCommonModule,
        ReactiveFormsModule,
        FormsModule,
        StoreModule.forRoot({
          ...st.reducers
        }),
        EffectsModule.forRoot([])
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunExerciseCardComponent);
    component = fixture.componentInstance;
    component.progress = testFeedback;
    component.series = mockSeries[0];
    component.ex = component.series.items[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
