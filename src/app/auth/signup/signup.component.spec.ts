import '../../../rx-index';

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastsManager } from 'ng2-toastr';

import { AppCommonModule } from '../../common/common.module';
import { MockToastManager } from '../../common/test/toastmanager.mock';
import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        AppCommonModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ToastsManager, useClass: MockToastManager }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
