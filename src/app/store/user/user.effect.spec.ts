import { UserUpsertRequest, UserUpsertSuccess } from './user.action';
import { IUser, INonSensitiveUser } from '../../model/user';
import { hot, cold } from 'jasmine-marbles';
import { UserEffects } from './user.effect';
import { UserService } from '../../services/user/user.service';
import { TestActions, getActions } from '../test';
import { ToastrService } from 'ngx-toastr';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Actions } from '@ngrx/effects';
import { of } from 'rxjs';

class MockToastrService {
  // tslint:disable-next-line:no-empty
  error(message: string) {}
}

const testNonSensitiveUser: INonSensitiveUser = {
  id: 'id',
  name: 'name'
};

describe('User effects', () => {
  let actions$: TestActions;
  let service: UserService;
  let effects: UserEffects;
  let toastr: ToastrService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        UserService,
        UserEffects,
        { provide: Actions, useFactory: getActions },
        { provide: ToastrService, useClass: MockToastrService }
      ]
    });

    actions$ = TestBed.get(Actions);
    service = TestBed.get(UserService);
    effects = TestBed.get(UserEffects);
    toastr = TestBed.get(ToastrService);

    spyOn(service, 'save').and.returnValue(of(testNonSensitiveUser));
    spyOn(toastr, 'error');
  });

  it('returns a UserUpsertSuccess, if request is successful ', () => {
    const testUser: IUser = {
      uid: 'uid',
      email: 'email1',
      ...testNonSensitiveUser
    };
    const action = new UserUpsertRequest(testUser);

    actions$.stream = hot('-a', { a: action });

    const completionAction = new UserUpsertSuccess(testNonSensitiveUser);
    const expected = cold('-b', { b: completionAction });

    expect(effects.upsertUsers$).toBeObservable(expected);
  });
});
