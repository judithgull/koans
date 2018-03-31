import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { AppCommonModule } from '../../common/common.module';
import { SignupComponent } from './signup.component';
import { ToastrService } from 'ngx-toastr';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  class MockToastrService {}

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SignupComponent],
        imports: [
          CommonModule,
          ReactiveFormsModule,
          AppCommonModule,
          HttpClientModule,
          RouterTestingModule
        ],
        providers: [{ provide: ToastrService, useClass: MockToastrService }]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
