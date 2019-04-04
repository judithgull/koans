import { Injectable } from '@angular/core';
import { IUser, INonSensitiveUser } from '../../model/user';
import { throwError, Observable, from, merge } from 'rxjs';
import { catchError, map, take, filter, switchMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/firestore';

const USER_COLLECTION = 'users';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private db: AngularFirestore) {}

  save(user: IUser): Observable<INonSensitiveUser> {
    const userQuery$ = this.db
      .collection(USER_COLLECTION, ref => ref.where('uid', '==', user.uid))
      .get()
      .pipe(take(1));

    const existingUser$: Observable<INonSensitiveUser> = userQuery$.pipe(
      filter(d => !d.empty),
      map(d => ({ ...user, id: d.docs[0].id }))
    );

    const newUser$ = userQuery$.pipe(
      filter(d => d.empty),
      switchMap(_ =>
        from(this.db.collection(`${USER_COLLECTION}`).add(user)).pipe(
          map(res => ({ id: res.id, ...user })),
          catchError(this.handleError)
        )
      )
    );

    return merge(existingUser$, newUser$);
  }

  private handleError(err: any) {
    if (err && err.status === 401) {
      return throwError('Unauthorized');
    }
    return throwError(err);
  }
}
