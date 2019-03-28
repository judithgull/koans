import { Component, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  @Input() signedIn: boolean;

  @Input() userName: string;

  @Output() signOut = new EventEmitter<string>();

  @Output() signIn = new EventEmitter<string>();

  OnSignOut() {
    this.signOut.emit('');
  }

  OnSignIn() {
    this.signIn.emit('');
  }
}
