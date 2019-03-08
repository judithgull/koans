import { Component } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { UserFacade } from '../../store/user/user.facade';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  signedIn$ = this.authService.signedIn$;
  user$ = this.userFacade.currentUser$;

  constructor(
    private authService: AuthService,
    private userFacade: UserFacade
  ) {}

  signIn() {
    this.authService.signInWithGoogle();
  }

  signOut() {
    this.authService.signOut();
  }
}
