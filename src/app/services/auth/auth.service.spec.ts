/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { User } from '../../models/user';
import { StorageService } from '../storage/storage.service';

describe('AuthService', () => {
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let AngularFireMock = {
    database: {
      object: jasmine.createSpy('object')
    },
    auth: {
      subscribe: jasmine.createSpy('subscribe'),
      logout: jasmine.createSpy('logout')
    }
  };
  let StorageServiceMock = {
    get: jasmine.createSpy('get'),
    set: jasmine.createSpy('set'),
    remove: jasmine.createSpy('remove')
  };
  AngularFireMock.database.object.and.returnValue(fakeSubscribe);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFire, useValue: AngularFireMock },
        { provide: StorageService, useValue: StorageServiceMock }
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should get use from cache', inject([AuthService, StorageService], (service: AuthService, storage: StorageService) => {
    StorageServiceMock.get.and.returnValue('{"displayName": "Jessica"}');
    service.getUserFromCache();
    expect(service.user.displayName).toBe('Jessica');
  }));

  it('should not get use from cache when no user in cache',
    inject([AuthService, StorageService], (service: AuthService, storage: StorageService) => {
    service.user = undefined;
    StorageServiceMock.get.and.returnValue(null);
    service.getUserFromCache();
    expect(service.user).toBeUndefined();
  }));

  it('should log out', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.logout();
    expect(StorageServiceMock.remove).toHaveBeenCalledWith('user');
    expect(AngularFireMock.auth.logout).toHaveBeenCalled();
  }));

  describe('isLoggedIn', () => {

    it('should be logged in when a user is present', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
      service.user = new User('', '', '', '', '', '');
      expect(service.isLoggedIn()).toBeTruthy();
    }));

    it('should not be logged in when no user', inject([AuthService], (service: AuthService, af: AngularFire) => {
      service.user = undefined;
      expect(service.isLoggedIn()).toBeFalsy();
    }));

  });

  describe('isAdmin', () => {
    it('should be admin when logged in and admin is true', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
      service.user = new User('', '', '', '', '', '');
      service.user.isAdmin = true;
      expect(service.isAdmin()).toBeTruthy();
    }));

    it('should not be admin when logged in and admin is not true',
        inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
      service.user = new User('', '', '', '', '', '');
      service.user.isAdmin = false;
      expect(service.isAdmin()).toBeFalsy();
    }));

    it('should not be admin when not logged in', inject([AuthService], (service: AuthService, af: AngularFire) => {
      service.user = undefined;
      expect(service.isAdmin()).toBeFalsy();
    }));
  });

  it('should determine not authed when user not found', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.user = new User('', '', '', '', '', '');
    service.determineAuthed(undefined);
    expect(service.user).toBeUndefined();
  }));

  it('should determine not authed when user found but missing google data',
    inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.user = new User('', '', '', '', '', '');
    service.determineAuthed({});
    expect(service.user).toBeUndefined();
  }));

  it('should determine authed when user found', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.user = undefined;
    let data = {
      google: {
        displayName: 'test testerson',
        email: 'test@testerson.com',
        photoURL: 'path/to/photo',
        providerId: '1',
        uid: 42
      },
      uid: 'ff111'
    };
    service.determineAuthed(data);
    expect(service.user.displayName).toBe(data.google.displayName);
    expect(service.user.email).toBe(data.google.email);
    expect(service.user.photoURL).toBe(data.google.photoURL);
    expect(service.user.providerId).toBe(data.google.providerId);
    expect(service.user.googleUid).toBe(data.google.uid);
    expect(service.user.uid).toBe(data.uid);
    expect(AngularFireMock.database.object).toHaveBeenCalledWith('/users/ff111');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(service.determineAdmin);
  }));

  it('should determine authed when user found but already have user data',
    inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    AngularFireMock.database.object.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    service.user = new User('Diana Prince', '', '', '', '', '');
    let data = {
      google: {
        displayName: 'test testerson',
        email: 'test@testerson.com',
        photoURL: 'path/to/photo',
        providerId: '1',
        uid: 42
      },
      uid: 'ff111'
    };
    service.determineAuthed(data);
    expect(service.user.displayName).toBe('Diana Prince');
    expect(AngularFireMock.database.object).not.toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
  }));

  describe('determineAdmin', () => {
    it('should determine not admin when no user', inject([AuthService], (service: AuthService) => {
      spyOn(service, 'cacheUser');
      service.user = new User('', '', '', '', '', '');
      service.user.isAdmin = true;
      service.determineAdmin(undefined);
      expect(service.user.isAdmin).toBeFalsy();
      expect(service.cacheUser).toHaveBeenCalled();
    }));
    it('should determine not admin when no user', inject([AuthService], (service: AuthService) => {
      spyOn(service, 'cacheUser');
      service.user = new User('', '', '', '', '', '');
      service.user.isAdmin = false;
      service.determineAdmin({level: 100});
      expect(service.user.isAdmin).toBeTruthy();
      expect(service.cacheUser).toHaveBeenCalled();
    }));
  });

  it('should cache user', inject([AuthService, StorageService], (service: AuthService, storage: StorageService) => {
    service.user = new User('stuff', 'things', 'awesome', 'random', 'a', 'b');
    service.cacheUser();
    expect(StorageServiceMock.set).toHaveBeenCalledWith('user', JSON.stringify(service.user));
  }));

});
