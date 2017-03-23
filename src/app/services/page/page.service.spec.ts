/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { PageService } from './page.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';
import { Page } from '../../models/page';

describe('PageService', () => {
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
        PageService,
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


  it('should ...', inject([PageService, HeaderService], (pageService: PageService) => {
    expect(pageService).toBeTruthy();
  }));

  it('should call get all pages endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getAll();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/page', { headers: 'fake headers' });
  }));

  it('should call get page endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getById(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/page/5');
  }));

  it('should call get page by key endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getByKey('stuff');
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/page/key/stuff');
  }));

  it('should call save page endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const page = new Page('', '', '');
    const response = service.save(page);
    expect(response).toBe('posted');
    expect(MockHttp.post).toHaveBeenCalledWith('/test/url/page', page, { headers: 'fake headers' });
  }));

  it('should call update page endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const page = new Page('', '', '');
    const response = service.update(5, page);
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/page/5', page, { headers: 'fake headers' });
  }));

  it('should call remove page endpoint', inject([PageService, HeaderService], (service: PageService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/page/5', { headers: 'fake headers' });
  }));
});
