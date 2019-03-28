import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { LogoComponent } from '../../common/logo/logo.component';
import { AccountComponent } from '../../admin/widgets/account/account.component';
import { IntroTextComponent } from '../../admin/widgets/intro-text/intro-text.component';
import { SeriesCardListComponent } from '../series-card-list/series-card-list.component';
import { SeriesCardComponent } from '../series-card/series-card.component';
import { SeriesIconComponent } from '../../common/series-icon/series-icon.component';
import { of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';
import { AuthService } from '../../common/auth/auth.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  const AngularFireAuthMocks = {
    auth: of({ uid: 'ABC123' })
  };
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
