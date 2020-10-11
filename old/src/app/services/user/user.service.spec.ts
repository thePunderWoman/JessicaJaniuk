/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';
import { User } from '../../models/user';

describe('UserService', () => {
  let MockHttp;
  const HeaderServiceMock = {
    createAuthHeaders: jasmine.createSpy('createAuthHeaders')
  };
  HeaderServiceMock.createAuthHeaders.and.returnValue('fake headers');
  beforeEach(async(() => {

    MockHttp = {
      get: jasmine.createSpy('get'),
      post: jasmine.createSpy('post'),
      put: jasmine.createSpy('put'),
      delete: jasmine.createSpy('delete')
    };
    MockHttp.get.and.returnValue('stuff');
    MockHttp.post.and.returnValue('posted');
    MockHttp.put.and.returnValue('putted');
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
    const response = service.getAll();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/user', { headers: 'fake headers' });
  }));

  it('should call get user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getUser(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/user/5', { headers: 'fake headers' });
  }));

  it('should call save user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    const user = new User('', '', '', '', false);
    const response = service.saveUser(user);
    expect(response).toBe('posted');
    expect(MockHttp.post).toHaveBeenCalledWith('/test/url/user', user, { headers: 'fake headers' });
  }));

  it('should call update user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    const user = new User('', '', '', '', false);
    const response = service.updateUser(5, user);
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/user/5', user, { headers: 'fake headers' });
  }));

  it('should call set password endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.setPassword(5, 'newstuff');
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/user/5/password', { password: 'newstuff' }, { headers: 'fake headers' });
  }));

  it('should call remove user endpoint', inject([UserService, HeaderService], (service: UserService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/user/5', { headers: 'fake headers' });
  }));
});
