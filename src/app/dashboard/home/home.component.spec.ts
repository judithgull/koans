import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastsManager } from 'ng2-toastr';

import { AuthModule } from '../../auth/auth.module';
import { AppCommonModule } from '../../common/common.module';
import { MockToastManager } from '../../common/test/toastmanager.mock';
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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent,
        SeriesSearchComponent,
        SearchFieldComponent,
        SearchFilterComponent,
        SeriesCardComponent,
        SeriesCardListComponent,
        TabItemComponent],
      imports: [
        AppCommonModule,
        AuthModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [{
        provide: ToastsManager, useClass: MockToastManager
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
