/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { PostService } from './post.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';
import { HeaderService } from '../header/header.service';
import { Post } from '../../models/post';

describe('PostService', () => {
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
        PostService,
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


  it('should ...', inject([PostService, HeaderService], (postService: PostService) => {
    expect(postService).toBeTruthy();
  }));

  it('should call get all posts endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getAll(1);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/post?page=1', { headers: 'fake headers' });
  }));

  it('should call get all published posts endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getAllPublished(1);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/post/published?page=1');
  }));

  it('should call get all published posts by category endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getAllPublishedByCategory('personal', 1);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/post/category/personal?page=1');
  }));

  it('should call get post endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getById(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/post/5');
  }));

  it('should call get post by date and key endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.getByKeyAndDate(2017, 4, 2, 'thisisakey');
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/test/url/post/2017/4/2/thisisakey');
  }));

  it('should call save post endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const post = new Post();
    const response = service.save(post);
    expect(response).toBe('posted');
    expect(MockHttp.post).toHaveBeenCalledWith('/test/url/post', post, { headers: 'fake headers' });
  }));

  it('should call update post endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const post = new Post();
    const response = service.update(5, post);
    expect(response).toBe('putted');
    expect(MockHttp.put).toHaveBeenCalledWith('/test/url/post/5', post, { headers: 'fake headers' });
  }));

  it('should call remove post endpoint', inject([PostService, HeaderService], (service: PostService) => {
    service.apiBaseUrl = '/test/url/';
    const response = service.remove(5);
    expect(response).toBe('things');
    expect(MockHttp.delete).toHaveBeenCalledWith('/test/url/post/5', { headers: 'fake headers' });
  }));
});
