/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { CategoryService } from './category.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';
import { Category } from '../../models/category';

describe('CategoryService', () => {
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
        CategoryService,
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


  it('should ...', inject([CategoryService, HeaderService], (categoryService: CategoryService) => {
    expect(categoryService).toBeTruthy();
  }));

  it('should call get all categorys endpoint', inject([CategoryService, HeaderService], (service: CategoryService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getAll();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/category');
  }));

  it('should call get category endpoint', inject([CategoryService, HeaderService], (service: CategoryService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.getById(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/category/5');
  }));

  it('should call save category endpoint', inject([CategoryService, HeaderService], (service: CategoryService) => {
    service.apiBaseUrl = '/test/url/';
    let category = new Category('', 3);
    let response = service.save(category);
    expect(response).toBe('posted');
    expect(MockHttp.post).toHaveBeenCalledWith('/test/url/category', category, { headers: 'fake headers' });
  }));

  it('should call update category endpoint', inject([CategoryService, HeaderService], (service: CategoryService) => {
    service.apiBaseUrl = '/test/url/';
    let category = new Category('', 5);
    let response = service.update(5, category);
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/category/5', category, { headers: 'fake headers' });
  }));

  it('should call remove category endpoint', inject([CategoryService, HeaderService], (service: CategoryService) => {
    service.apiBaseUrl = '/test/url/';
    let response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/category/5', { headers: 'fake headers' });
  }));
});
