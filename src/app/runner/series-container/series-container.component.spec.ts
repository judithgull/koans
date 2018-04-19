import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { combineReducers, StoreModule } from '@ngrx/store';

import { AppCommonModule } from '../../common/common.module';
import * as st from '../../store';
import { ExerciseNavButtonsComponent } from '../exercise-nav-buttons/exercise-nav-buttons.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SeriesRunnerComponent } from '../series-runner/series-runner.component';
import { SeriesContainerComponent } from './series-container.component';

describe('SeriesContainerComponent', () => {
  let component: SeriesContainerComponent;
  let fixture: ComponentFixture<SeriesContainerComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SeriesContainerComponent,
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
    fixture = TestBed.createComponent(SeriesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
