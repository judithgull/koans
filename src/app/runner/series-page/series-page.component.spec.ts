import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesPageComponent } from './series-page.component';
import { SeriesRunnerComponent } from '../series-runner/series-runner.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { ExerciseNavButtonsComponent } from '../exercise-nav-buttons/exercise-nav-buttons.component';
import { AppCommonModule } from '../../common';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as st from '../../store';
import { SeriesContainerComponent } from '../series-container/series-container.component';

describe('SeriesPageComponent', () => {
  let component: SeriesPageComponent;
  let fixture: ComponentFixture<SeriesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SeriesContainerComponent,
        SeriesRunnerComponent,
        ProgressBarComponent,
        ExerciseNavButtonsComponent,
        SeriesPageComponent
      ],
      imports: [
        AppCommonModule,
        RouterTestingModule,
        StoreModule.forRoot({
          ...st.reducers
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
