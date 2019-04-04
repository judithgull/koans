import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { LogoComponent } from '../../../common/widgets/logo/logo.component';
import { AccountComponent } from '../account/account.component';
import { IntroTextComponent } from '../intro-text/intro-text.component';
import { SeriesIconComponent } from '../../../common/widgets/series-icon/series-icon.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../../store';
import { AuthService } from '../../../common/auth/auth.service';
import { SeriesCardListComponent } from '../series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../series-card/series-card.component';

describe('HomeComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  const AuthServiceMocks = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        DashboardComponent,
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
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
