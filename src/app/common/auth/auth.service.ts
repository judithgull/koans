import { Injectable } from '@angular/core';
import { Observable, from } from 'rxjs';

import { IUser } from '../../model/user';
import { map, switchMap, filter, tap } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { UserFacade } from '../../store/user/user.facade';

/**
 * Service for authenticating user (uses firebase as an authentication server)
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
  ) {}

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
