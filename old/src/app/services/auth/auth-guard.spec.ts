import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { CookieService } from 'ngx-cookie';
import { AuthService } from './auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  const CookieServiceMock = {
    get: jasmine.createSpy('get')
  };

  const AuthServiceMock = {
    logout: jasmine.createSpy('logout')
  };
  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    CookieServiceMock.get.calls.reset();
    AuthServiceMock.logout.calls.reset();
    routerStub.navigate.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: CookieService, useValue: CookieServiceMock }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      spyOn(guard, 'retrieveToken').and.returnValue('stuff');
      expect(guard.canActivate()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should activate if is admin and has token', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue('stuff');
      expect(guard.canActivate()).toBeTruthy();
      expect(AuthServiceMock.logout).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();
    }));

    it('should not activate if is admin and has no token', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue(undefined);
      expect(guard.canActivate()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));
  });

  describe('canActivateChild', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      spyOn(guard, 'retrieveToken').and.returnValue('stuff');
      expect(guard.canActivateChild()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should activate if is admin and has token', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue('stuff');
      expect(guard.canActivateChild()).toBeTruthy();
      expect(AuthServiceMock.logout).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();
    }));

    it('should not activate if is admin and has no token', inject([AuthGuard], (guard: AuthGuard) => {
      const expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue(undefined);
      expect(guard.canActivateChild()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));
  });

  describe('retrieveUser', () => {
    it('should return null if no token', inject([AuthGuard], (guard: AuthGuard) => {
      guard.decode = jasmine.createSpy('jwt_decode').and.returnValue(null);
      expect(guard.retrieveUser(undefined)).toBeNull();
    }));
    it('should return null if no user in token', inject([AuthGuard], (guard: AuthGuard) => {
      guard.decode = jasmine.createSpy('jwt_decode').and.returnValue(null);
      expect(guard.retrieveUser('stuff')).toBeNull();
    }));
    it('should return User if user in token', inject([AuthGuard], (guard: AuthGuard) => {
      guard.decode = jasmine.createSpy('jwt_decode').and.returnValue({isAdmin: true});
      const user = guard.retrieveUser('stuff');
      expect(user).not.toBeNull();
      expect(user.isAdmin).toBeTruthy();
    }));
  });

  describe('retrieveToken', () => {
    it('should return null if no token in storage', inject([AuthGuard], (guard: AuthGuard) => {
      CookieServiceMock.get.and.returnValue(null);
      expect(guard.retrieveToken()).toBeNull();
    }));
    it('should return User if user in storage', inject([AuthGuard], (guard: AuthGuard) => {
      CookieServiceMock.get.and.returnValue('data');
      const token = guard.retrieveToken();
      expect(token).not.toBeNull();
    }));
  });
});
