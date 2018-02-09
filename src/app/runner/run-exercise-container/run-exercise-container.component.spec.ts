import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunExerciseContainerComponent } from './run-exercise-container.component';

describe('RunExerciseContainerComponent', () => {
  let component: RunExerciseContainerComponent;
  let fixture: ComponentFixture<RunExerciseContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunExerciseContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunExerciseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
