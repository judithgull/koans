import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNavButtonsComponent } from './exercise-nav-buttons.component';
import { RouterTestingModule } from '@angular/router/testing';
import { testFeedback } from '../../common/test';

describe('ExerciseNavButtonsComponent', () => {
  let component: ExerciseNavButtonsComponent;
  let fixture: ComponentFixture<ExerciseNavButtonsComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExerciseNavButtonsComponent],
        imports: [RouterTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseNavButtonsComponent);
    component = fixture.componentInstance;
    component.progress = testFeedback;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
