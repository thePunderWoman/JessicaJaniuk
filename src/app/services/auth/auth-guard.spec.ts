/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user';

describe('AuthGuard', () => {
  let StorageServiceMock = {
    get: jasmine.createSpy('get')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: StorageService, useValue: StorageServiceMock }
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      expect(guard.canActivate()).toBeFalsy();
    }));

    it('should activate if is admin', inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      expect(guard.canActivate()).toBeTruthy();
    }));
  });

  describe('canActivateChild', () => {
    it('should not activate child if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: false});
      expect(guard.canActivateChild()).toBeFalsy();
    }));

    it('should activate child if is admin', inject([AuthGuard], (guard: AuthGuard) => {
      spyOn(guard, 'retrieveUser').and.returnValue({isAdmin: true});
      expect(guard.canActivateChild()).toBeTruthy();
    }));
  });

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
});
