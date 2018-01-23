import '../../../rx-index';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastsManager } from 'ng2-toastr';

import { SeriesService } from '../../common/series.service';
import { MockSeriesService } from '../../common/test/series-service.mock';
import { MockToastManager } from '../../common/test/toastmanager.mock';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SeriesCardListComponent } from '../series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { SeriesSearchComponent } from './series-search.component';
import { SeriesIconComponent } from '../../common/series-icon/series-icon.component';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';

describe('SeriesSearchComponent', () => {
  let component: SeriesSearchComponent;
  let fixture: ComponentFixture<SeriesSearchComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          SeriesIconComponent,
          SeriesSearchComponent,
          SearchFieldComponent,
          SearchFilterComponent,
          SeriesCardComponent,
          SeriesCardListComponent,
          TabItemComponent
        ],
        imports: [
          StoreModule.forRoot({
            ...rootStore.reducers
          })
        ],
        providers: [
          { provide: SeriesService, useClass: MockSeriesService },
          { provide: ToastsManager, useClass: MockToastManager }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
