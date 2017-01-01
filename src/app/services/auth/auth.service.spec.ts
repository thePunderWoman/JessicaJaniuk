/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFire } from 'angularfire2';
import { User } from '../../models/user';

describe('AuthService', () => {
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let AngularFireMock = {
    database: {
      object: jasmine.createSpy('object')
    },
    auth: {
      subscribe: jasmine.createSpy('subscribe')
    }
  };
  AngularFireMock.database.object.and.returnValue(fakeSubscribe);
  fakeSubscribe.subscribe.and.callFake((callback) => {
    callback({level: 100});
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFire, useValue: AngularFireMock },
      ]
    });
  });

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));

  it('should be logged in when a user is present', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.user = new User(af, '', '', '', '', '', '');
    expect(service.isLoggedIn()).toBeTruthy();
  }));

  it('should not be logged in when no user', inject([AuthService], (service: AuthService, af: AngularFire) => {
    service.user = undefined;
    expect(service.isLoggedIn()).toBeFalsy();
  }));

  it('should determine not authed when user not found', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
    service.user = new User(af, '', '', '', '', '', '');
    service.determineAuthed(undefined);
    expect(service.user).toBeUndefined();
  }));

  it('should determine not authed when user not found', inject([AuthService, AngularFire], (service: AuthService, af: AngularFire) => {
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
  }));

});
