import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let el: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AccountComponent]
    })
      .compileComponents();
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

  describe('Template', () => {
    let login: DebugElement;
    let signup: DebugElement;
    let logout: DebugElement;

    beforeEach(() => {
      const links = el.queryAll(By.css('a'));
      login = links[0];
      signup = links[1];
      logout = links[2];
    });

    it('should show login and signup when not logged in', () => {
      component.isLoggedIn = false;
      fixture.detectChanges();

      expect(login.nativeElement.textContent).toBe('Login');
      expect(login.properties['hidden']).toBeFalsy();
      expect(signup.nativeElement.textContent).toBe('Signup');
      expect(signup.properties['hidden']).toBeFalsy();
      expect(logout.nativeElement.textContent).toBe('Logout');
      expect(logout.properties['hidden']).toBeTruthy();
    });

    it('should show username and logout when logged in', () => {
      component.isLoggedIn = true;
      component.userName = 'testUser';
      fixture.detectChanges();

      expect(login.nativeElement.textContent).toBe('Login');
      expect(login.properties['hidden']).toBeTruthy();
      expect(signup.nativeElement.textContent).toBe('Signup');
      expect(signup.properties['hidden']).toBeTruthy();
      expect(logout.nativeElement.textContent).toBe('Logout');
      expect(logout.properties['hidden']).toBeFalsy();
    });

    it('should trigger a logout event on logout button click', () => {
      spyOn(component.logoutChanges, 'emit').and.callThrough();
      logout.triggerEventHandler('click', null);
      expect(component.logoutChanges.emit).toHaveBeenCalledWith('');
    });


  });


});
