import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/auth/auth.service';
import { UserFacade } from '../../store/user/user.facade';
import { SeriesFacade } from '../../store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  signedIn$ = this.authService.signedIn$;
  user$ = this.userFacade.currentUser$;
  seriesList$ = this.seriesFacade.allSeries$;
  message = 'Nothing here yet.';

  constructor(
    private authService: AuthService,
    private userFacade: UserFacade,
    private seriesFacade: SeriesFacade
  ) {}

  signIn() {
    this.authService.signInWithGoogle();
  }

  signOut() {
    this.authService.signOut();
  }

  ngOnInit() {
    this.seriesFacade.search({
      searchText: '',
      authorId: ''
    });
  }
}
