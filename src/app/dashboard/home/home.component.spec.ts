import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';

import { AuthModule } from '../../auth/auth.module';
import { AppCommonModule } from '../../common/common.module';
import * as rootStore from '../../store';
import { SearchFieldComponent } from '../search-field/search-field.component';
import { SearchFilterComponent } from '../search-filter/search-filter.component';
import { SeriesCardListComponent } from '../series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { SeriesSearchComponent } from '../series-search/series-search.component';
import { TabItemComponent } from '../tab-item/tab-item.component';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [
          HomeComponent,
          SeriesSearchComponent,
          SearchFieldComponent,
          SearchFilterComponent,
          SeriesCardComponent,
          SeriesCardListComponent,
          TabItemComponent
        ],
        imports: [
          AppCommonModule,
          AuthModule,
          RouterTestingModule,
          HttpClientTestingModule,
          StoreModule.forRoot({
            ...rootStore.reducers
          })
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
