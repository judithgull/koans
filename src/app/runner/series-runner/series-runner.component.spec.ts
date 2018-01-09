import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import '../../../rx-index';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AppCommonModule } from '../../common/common.module';
import { SeriesService } from '../../common/series.service';
import { MockSeriesService } from '../../common/test/series-service.mock';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { SeriesRunnerComponent } from './series-runner.component';

describe('SeriesRunnerComponent', () => {
  let component: SeriesRunnerComponent;
  let fixture: ComponentFixture<SeriesRunnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SeriesRunnerComponent,
        ProgressBarComponent
      ],
      imports: [
        AppCommonModule,
        RouterTestingModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: SeriesService,
          useClass: MockSeriesService
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and initialize', () => {
    expect(component).toBeTruthy();
    expect(component.series).toBeDefined();
  });
});
