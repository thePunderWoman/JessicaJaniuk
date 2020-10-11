import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AuthenticationComponent } from './authentication.component';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie';
import { MdInputModule } from '@angular/material';
import { Router } from '@angular/router';

describe('AuthenticationComponent', () => {
  let component: AuthenticationComponent;
  let fixture: ComponentFixture<AuthenticationComponent>;
  const CookieServiceMock = {
    get: jasmine.createSpy('get'),
    put: jasmine.createSpy('put')
  };
  const AuthServiceMock = {
    isLoggedIn: jasmine.createSpy('isLoggedIn'),
    isAdmin: jasmine.createSpy('isAdmin'),
    logout: jasmine.createSpy('logout'),
    authenticate: jasmine.createSpy('authenticate'),
    user: {
      displayName: 'stuff'
    }
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };
  AuthServiceMock.authenticate.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenticationComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MdInputModule,
      ],
      providers: [
        { provide: CookieService, useValue: CookieServiceMock },
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: Router, useValue: routerStub }
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
    CookieServiceMock.get.and.returnValue(undefined);
    expect(component.isLoggedIn()).toBeFalsy();
  });

  it('should determine is logged in when authed', () => {
    CookieServiceMock.get.and.returnValue('stuff');
    expect(component.isLoggedIn()).toBeTruthy();
  });

  it('should login', () => {
    component.username = 'test';
    component.password = 'password';
    component.login();
    expect(AuthServiceMock.authenticate).toHaveBeenCalledWith('test', 'password');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.onAuthenticate);
  });

  it('should logout', () => {
    component.logout();
    expect(AuthServiceMock.logout).toHaveBeenCalled();
  });

  describe('onAuthenticate', () => {
    beforeEach(() => {
      CookieServiceMock.put.calls.reset();
      routerStub.navigate.calls.reset();
    });

    it('should set values and redirect on ok', () => {
      component.domain = 'testdomain';
      component.secureCookie = true;
      const data = { ok: true, json: jasmine.createSpy('json') };
      const response = { token: 'blah', expires: 'things', user: 'stuff' };
      const options = { path: '/', domain: 'testdomain', expires: response.expires, secure: true};
      data.json.and.returnValue(response);
      component.onAuthenticate(data);
      expect(CookieServiceMock.put)
        .toHaveBeenCalledWith(
          'token',
          'blah',
          options);
      expect(routerStub.navigate).toHaveBeenCalledWith(['/manage']);
    });
    it('should do nothing if not ok', () => {
      const data = { ok: false, json: jasmine.createSpy('json') };
      const response = { token: 'blah', expires: 'things', user: 'stuff' };
      data.json.and.returnValue(response);
      component.onAuthenticate(data);
      expect(CookieServiceMock.put).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();
    });
  });
});
