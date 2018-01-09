import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFeedbackComponent } from './exercise-feedback.component';

describe('ExerciseFeedbackComponent', () => {
  let component: ExerciseFeedbackComponent;
  let fixture: ComponentFixture<ExerciseFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
