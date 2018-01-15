import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseTextComponent } from './exercise-text.component';

describe('ExerciseTextComponent', () => {
  let component: ExerciseTextComponent;
  let fixture: ComponentFixture<ExerciseTextComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExerciseTextComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
