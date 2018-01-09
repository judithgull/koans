import { Component, OnInit } from '@angular/core';

import { User } from '../../auth/model/user';
import { AuthService } from '../../common/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoggedIn = false;
  user: User;

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
    this.updateLoginData();
  }

  logout() {
    this.auth.logout();
    this.updateLoginData();
  }

  updateLoginData() {
    this.isLoggedIn = this.auth.isLoggedIn();
    this.user = this.auth.getLoggedInUser();
  }
}
