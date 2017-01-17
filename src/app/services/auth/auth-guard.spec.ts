/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { StorageService } from '../storage/storage.service';
import { AuthService } from './auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

describe('AuthGuard', () => {
  let StorageServiceMock = {
    get: jasmine.createSpy('get')
  };

  let AuthServiceMock = {
    logout: jasmine.createSpy('logout')
  };
  let routerStub = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    StorageServiceMock.get.calls.reset();
    AuthServiceMock.logout.calls.reset();
    routerStub.navigate.calls.reset();
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: Router, useValue: routerStub },
        { provide: AuthService, useValue: AuthServiceMock },
        { provide: StorageService, useValue: StorageServiceMock }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivate()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should activate if is admin, has token, and isnt expired', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivate()).toBeTruthy();
      expect(AuthServiceMock.logout).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();
    }));

    it('should not activate if is admin, has no token', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue(undefined);
      expect(guard.canActivate()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should not activate if is admin, has token, and is expired', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() - 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivate()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));
  });

  describe('canActivateChild', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivateChild()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should activate if is admin, has token, and isnt expired', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivateChild()).toBeTruthy();
      expect(AuthServiceMock.logout).not.toHaveBeenCalled();
      expect(routerStub.navigate).not.toHaveBeenCalled();
    }));

    it('should not activate if is admin, has no token', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() + 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue(undefined);
      expect(guard.canActivateChild()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));

    it('should not activate if is admin, has token, and is expired', inject([AuthGuard], (guard: AuthGuard) => {
      let expDate = new Date();
      expDate.setDate(expDate.getDate() - 1);
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      spyOn(guard, 'retrieveToken').and.returnValue({token: 'stuff', expires: expDate.toISOString() });
      expect(guard.canActivateChild()).toBeFalsy();
      expect(AuthServiceMock.logout).toHaveBeenCalled();
      expect(routerStub.navigate).toHaveBeenCalledWith(['/auth']);
    }));  });

  describe('retrieveUser', () => {
    it('should return null if no user in storage', inject([AuthGuard], (guard: AuthGuard) => {
      StorageServiceMock.get.and.returnValue(null);
      expect(guard.retrieveUser()).toBeNull();
    }));
    it('should return User if user in storage', inject([AuthGuard], (guard: AuthGuard) => {
      StorageServiceMock.get.and.returnValue('{"isAdmin": true}');
      let user = guard.retrieveUser();
      expect(user).not.toBeNull();
      expect(user.isAdmin).toBeTruthy();
    }));
  });

  describe('retrieveToken', () => {
    it('should return null if no token in storage', inject([AuthGuard], (guard: AuthGuard) => {
      StorageServiceMock.get.and.returnValue(null);
      expect(guard.retrieveToken()).toBeNull();
    }));
    it('should return User if user in storage', inject([AuthGuard], (guard: AuthGuard) => {
      StorageServiceMock.get.and.returnValue('{"token": "data", "expires": "date"}');
      let token = guard.retrieveToken();
      expect(token).not.toBeNull();
    }));
  });
});
