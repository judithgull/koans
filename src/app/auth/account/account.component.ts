import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {

  @Input() isLoggedIn: boolean;

  @Input() userName: string;

  @Output() logoutChanges = new EventEmitter<string>();

  logout() {
    this.logoutChanges.emit('');
  }

}
