import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesContainerComponent } from './series-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AppCommonModule } from '../../common/common.module';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as rootStore from '../../store';
import * as runnerStore from '../store';
import { SeriesRunnerComponent } from '../series-runner/series-runner.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ExerciseNavButtonsComponent } from '../exercise-nav-buttons/exercise-nav-buttons.component';

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
            ...rootStore.reducers,
            runner: combineReducers(runnerStore.reducers)
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
