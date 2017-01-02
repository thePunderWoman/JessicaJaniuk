/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthGuard } from './auth-guard';
import { AuthService } from './auth.service';

describe('AuthGuard', () => {
  let AuthServiceMock = {
    isAdmin: jasmine.createSpy('isAdmin')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AuthService, useValue: AuthServiceMock },
      ]
    });
  });

  it('should ...', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  describe('canActivate', () => {
    it('should not activate if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      AuthServiceMock.isAdmin.and.returnValue(false);
      expect(guard.canActivate()).toBeFalsy();
    }));

    it('should activate if is admin', inject([AuthGuard], (guard: AuthGuard) => {
      AuthServiceMock.isAdmin.and.returnValue(true);
      expect(guard.canActivate()).toBeTruthy();
    }));
  });

  describe('canActivateChild', () => {
    it('should not activate child if not admin', inject([AuthGuard], (guard: AuthGuard) => {
      AuthServiceMock.isAdmin.and.returnValue(false);
      expect(guard.canActivateChild()).toBeFalsy();
    }));

    it('should activate child if is admin', inject([AuthGuard], (guard: AuthGuard) => {
      AuthServiceMock.isAdmin.and.returnValue(true);
      expect(guard.canActivateChild()).toBeTruthy();
    }));
  });
});
