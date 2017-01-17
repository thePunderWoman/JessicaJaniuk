/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';

describe('UserService', () => {
  let MockHttp;
  let HeaderServiceMock = {
    createAuthHeaders: jasmine.createSpy('createAuthHeaders')
  };
  HeaderServiceMock.createAuthHeaders.and.returnValue('fake headers');
  beforeEach(async(() => {

    MockHttp = {
      get: jasmine.createSpy('get'),
      delete: jasmine.createSpy('delete')
    };
    MockHttp.get.and.returnValue('stuff');
    MockHttp.delete.and.returnValue('things');

    TestBed.configureTestingModule({
      providers: [
        UserService,
        { provide: HeaderService, useValue: HeaderServiceMock },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useValue: MockHttp
        }
      ]
    });
  }));


  it('should ...', inject([UserService, HeaderService], (userService: UserService) => {
    expect(userService).toBeTruthy();
  }));

  it('should call get all users endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getAll();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/user', { headers: 'fake headers' });
  }));

  it('should call get user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getUser(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/user/5', { headers: 'fake headers' });
  }));

  it('should call remove user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/user/5', { headers: 'fake headers' });
  }));
});
