import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LogoComponent } from '../../common/logo/logo.component';
import { AccountComponent } from '../../admin/widgets/account/account.component';
import { IntroTextComponent } from '../../admin/widgets/intro-text/intro-text.component';
import { SeriesIconComponent } from '../../common/series-icon/series-icon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';
import { AuthService } from '../../common/auth/auth.service';
import { SeriesCardListComponent } from '../../admin/widgets/series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../../admin/widgets/series-card/series-card.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const AuthServiceMocks = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LogoComponent,
        AccountComponent,
        IntroTextComponent,
        SeriesCardListComponent,
        SeriesCardComponent,
        SeriesIconComponent
      ],
      providers: [
        {
          provide: AuthService,
          useValue: AuthServiceMocks
        }
      ],
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({
          ...rootStore.reducers
        })
      ]
    }).compileComponents();
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
