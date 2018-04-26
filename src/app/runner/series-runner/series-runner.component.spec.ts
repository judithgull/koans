import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../../common/common.module';
import { mockSeries, testFeedback } from '../../common/test';
import * as st from '../../store';
import { ExerciseNavButtonsComponent } from '../exercise-nav-buttons/exercise-nav-buttons.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SeriesRunnerComponent } from './series-runner.component';

describe('SeriesRunnerComponent', () => {
  let component: SeriesRunnerComponent;
  let fixture: ComponentFixture<SeriesRunnerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SeriesRunnerComponent,
          ProgressBarComponent,
          ExerciseNavButtonsComponent
        ],
        imports: [
          AppCommonModule,
          RouterTestingModule,
          StoreModule.forRoot({
            ...st.reducers
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesRunnerComponent);
    component = fixture.componentInstance;
    component.series = mockSeries[0];
    component.progresses = [];
    component.progress = testFeedback;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
  });
});
