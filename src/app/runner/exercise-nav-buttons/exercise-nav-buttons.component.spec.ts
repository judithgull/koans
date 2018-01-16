import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseNavButtonsComponent } from './exercise-nav-buttons.component';

describe('ExerciseNavButtonsComponent', () => {
  let component: ExerciseNavButtonsComponent;
  let fixture: ComponentFixture<ExerciseNavButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExerciseNavButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExerciseNavButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
