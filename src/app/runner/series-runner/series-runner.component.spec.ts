import '../../../rx-index';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppCommonModule } from '../../common/common.module';
import { SeriesService } from '../../common/series.service';
import { MockSeriesService } from '../../common/test/series-service.mock';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SeriesRunnerComponent } from './series-runner.component';
import { ExerciseNavButtonsComponent } from '../exercise-nav-buttons/exercise-nav-buttons.component';
import { StoreModule, combineReducers } from '@ngrx/store';
import * as rootStore from '../../store';
import * as runnerStore from '../store';

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
            ...rootStore.reducers,
            runner: combineReducers(runnerStore.reducers)
          })
        ],
        providers: [
          {
            provide: SeriesService,
            useClass: MockSeriesService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.series$).toBeDefined();
  });
});
