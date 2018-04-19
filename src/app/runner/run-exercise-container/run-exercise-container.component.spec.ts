import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunExerciseContainerComponent } from './run-exercise-container.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { combineReducers, StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';

describe('RunExerciseContainerComponent', () => {
  let component: RunExerciseContainerComponent;
  let fixture: ComponentFixture<RunExerciseContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [RunExerciseContainerComponent],
        schemas: [NO_ERRORS_SCHEMA],
        imports: [
          StoreModule.forRoot({
            ...rootStore.reducers
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(RunExerciseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
