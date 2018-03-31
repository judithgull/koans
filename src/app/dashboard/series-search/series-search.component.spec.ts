import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';

import { SeriesIconComponent } from '../../common/series-icon/series-icon.component';
import * as rootStore from '../../store';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SeriesCardListComponent } from '../series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { SeriesSearchComponent } from './series-search.component';

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
