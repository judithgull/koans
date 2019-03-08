import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { of, Observable } from 'rxjs';

import { AccountComponent } from './account.component';
import { AuthService } from '../../common/auth/auth.service';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let el: DebugElement;

  class MockAuthService {
    userName$: Observable<string> = of(null);
    loggedIn$ = of(false);
  }
  const mockAuthService = new MockAuthService();

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    el = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Account', () => {
    let signIn: DebugElement;
    let signOut: DebugElement;

    beforeEach(() => {
      const links = el.queryAll(By.css('a'));
      signIn = links[0];
      signOut = links[1];
    });

    it('should show signIn, if not signed in', () => {
      fixture.detectChanges();

      expect(signIn.nativeElement.textContent).toBe('Sign in with Google');
      expect(signIn.properties['hidden']).toBeFalsy();

      expect(signOut.nativeElement.textContent).toBe('Sign out');
      expect(signOut.properties['hidden']).toBeTruthy();
    });
  });
});
