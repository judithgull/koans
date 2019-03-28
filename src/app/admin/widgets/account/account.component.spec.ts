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
