/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthenticationComponent } from './authentication.component';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth/auth.service';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  let AngularFireMock = {
    auth: {
      login: jasmine.createSpy('login'),
      logout: jasmine.createSpy('logout')
    }
  };
  let AuthServiceMock = {
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    isAdmin: jasmine.createSpy('isAdmin'),
    user: {
      displayName: 'stuff'
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      providers: [
        { provide: AngularFire, useValue: AngularFireMock },
        { provide: AuthService, useValue: AuthServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenticationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should determine not logged in when not authed', () => {
    AuthServiceMock.isLoggedIn.and.returnValue(false);
    expect(component.isLoggedIn()).toBeFalsy();
  });

  it('should determine is logged in when authed', () => {
    AuthServiceMock.isLoggedIn.and.returnValue(true);
    expect(component.isLoggedIn()).toBeTruthy();
  });

  it('should login', () => {
    component.login();
    expect(AngularFireMock.auth.login).toHaveBeenCalled();
  });

  it('should logout', () => {
    component.logout();
    expect(AngularFireMock.auth.logout).toHaveBeenCalled();
  });
});
