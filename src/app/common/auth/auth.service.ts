import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { IUser } from '../../model/user';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserFacade } from '../../store/user/user.facade';

const TOKEN_KEY = 'token';

/**
 * Service for authenticating user (uses firebase as an authentication server),
 * Saves user in backend as well, to be able to associate exercises with users.
 */
@Injectable({ providedIn: 'root' })
export class AuthService {
  firebaseUsers$ = this.fireAuth.authState.pipe(filter(user => !!user));
  firebaseTokens$ = this.firebaseUsers$.pipe(
    switchMap(firebaseUser => firebaseUser.getIdToken(true))
  );

  constructor(
    private fireAuth: AngularFireAuth,
    private userFacade: UserFacade
  ) {
    this.init();
  }

  init() {
    this.firebaseTokens$.subscribe(token => this.saveToken(token));

    this.firebaseUsers$
      .pipe(
        map(AuthService.toUser),
        tap(user => this.userFacade.upsert(user))
      )
      .subscribe();
  }

  private saveToken(token: string): void {
    localStorage.setItem(TOKEN_KEY, token);
  }

  static toUser(firebaseUser: firebase.User): IUser {
    if (!firebaseUser) {
      return null;
    }
    return {
      uid: firebaseUser.uid,
      name: firebaseUser.displayName,
      email: firebaseUser.email
    };
  }

  signInWithGoogle(): Observable<IUser> {
    return this.signInWithFireBase().pipe(
      map(cred => cred.user),
      map(AuthService.toUser),
      tap(user => this.userFacade.upsert(user))
    );
  }

  private signInWithFireBase(): Observable<auth.UserCredential> {
    const provider = new auth.GoogleAuthProvider();
    provider.addScope('email');
    return from(this.fireAuth.auth.signInWithPopup(provider));
  }

  signOut() {
    this.fireAuth.auth.signOut();
    this.userFacade.deselectUser();
  }

  get signedIn$(): Observable<boolean> {
    return this.fireAuth.user.pipe(map(user => !!user));
  }
}
