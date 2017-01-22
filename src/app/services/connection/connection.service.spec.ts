/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { ConnectionService } from './connection.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';
import { Connection } from '../../models/connection';

describe('ConnectionService', () => {
  let MockHttp;
  let HeaderServiceMock = {
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
        ConnectionService,
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


  it('should ...', inject([ConnectionService, HeaderService], (connectionService: ConnectionService) => {
    expect(connectionService).toBeTruthy();
  }));

  it('should call get all connections endpoint', inject([ConnectionService, HeaderService], (service: ConnectionService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getAll();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/connection', { headers: 'fake headers' });
  }));

  it('should call get connection endpoint', inject([ConnectionService, HeaderService], (service: ConnectionService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getById(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/connection/5', { headers: 'fake headers' });
  }));

  it('should call save connection endpoint', inject([ConnectionService, HeaderService], (service: ConnectionService) => {
    service.apiBaseUrl = '/test/url/';
    let connection = new Connection('', '', '', '');
    let response = service.save(connection);
    expect(response).toBe('posted');
    expect(MockHttp.post).toHaveBeenCalledWith('/test/url/connection', connection, { headers: 'fake headers' });
  }));

  it('should call update connection endpoint', inject([ConnectionService, HeaderService], (service: ConnectionService) => {
    service.apiBaseUrl = '/test/url/';
    let connection = new Connection('', '', '', '');
    let response = service.update(5, connection);
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/connection/5', connection, { headers: 'fake headers' });
  }));

  it('should call remove connection endpoint', inject([ConnectionService, HeaderService], (service: ConnectionService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/connection/5', { headers: 'fake headers' });
  }));
});
