import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';

import { ValidationService } from './validation.service';

/**
 * Component to display validation messages
 */
@Component({
  selector: 'app-validation-messages',
  templateUrl: './validation-messages.component.html',
  styleUrls: ['./validation-messages.component.scss'],
  providers: [ValidationService]
})
export class ValidationMessagesComponent implements OnInit, OnDestroy {
  messages: string = null;
  private subscr;

  @Input() control: AbstractControl;
  @Input() validationKey;

  constructor(private validationService: ValidationService) {
    this.validationKey = validationService.defaultKey;
  }

  ngOnInit() {
    this.subscr = this.control.valueChanges
      .debounceTime(1000)
      .subscribe(value => this.setMessage(this.control, this.validationKey));
  }

  ngOnDestroy(): void {
    this.subscr.unsubscribe();
  }

  setMessage(c: AbstractControl, fieldName: string): void {
    this.messages = null;
    if ((c.touched || c.dirty) && c.errors) {
      this.messages = Object.entries(c.errors)
        .map(entry => {
          return this.validationService.getMessage(
            fieldName,
            entry[0],
            entry[1]
          );
        })
        .join(' ');
    }
  }
}
