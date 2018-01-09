import '../../../rx-index';

import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { ValidationMessagesComponent } from './validation-messages.component';

describe('ValidationMessagesComponent', () => {
  let component: ValidationMessagesComponent;
  let inputComponent: TestInputComponent;
  let fixture: ComponentFixture<ValidationMessagesComponent>;
  let inputFixture: ComponentFixture<TestInputComponent>;
  let emailControl: AbstractControl;

  /**
   * Test component with input element
   */
  @Component({
    template: `
    <form [formGroup]="form">
    <input class='input' id='email' type='email' formControlName='email' />
    </form>
    `
  })
  class TestInputComponent implements OnInit {
    form: FormGroup;

    constructor(private fb: FormBuilder) {
    }

    ngOnInit(): void {
      this.form = this.fb.group({
        email: [null, Validators.required]
      });
    }
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ValidationMessagesComponent,
        TestInputComponent
      ],
      imports: [
        ReactiveFormsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationMessagesComponent);
    inputFixture = TestBed.createComponent(TestInputComponent);
    component = fixture.componentInstance;
    inputComponent = inputFixture.componentInstance;

    inputFixture.detectChanges();
    emailControl = inputComponent.form.controls['email'];
    component.control = emailControl;

    fixture.detectChanges();

  });

  it('should initially not have errors', () => {
    expect(component).toBeTruthy();
    expect(component.messages).toBe(null);
  });
});
