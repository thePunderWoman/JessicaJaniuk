/* tslint:disable:no-unused-variable */

import { TestBed, async, inject, getTestBed } from '@angular/core/testing';
import { FlickrService } from './flickr.service';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Http, BaseRequestOptions, XHRBackend, Response, ResponseOptions } from '@angular/http';

describe('FlickrService', () => {
  let MockHttp;
  beforeEach(async(() => {

    MockHttp = {
      get: jasmine.createSpy('get')
    };
    MockHttp.get.and.returnValue('stuff');

    TestBed.configureTestingModule({
      providers: [
        FlickrService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useValue: MockHttp
        }
      ]
    });
  }));


  it('should ...', inject([FlickrService], (flickrService: FlickrService) => {
    expect(flickrService).toBeTruthy();
  }));

  it('should build album url', inject([FlickrService], (service: FlickrService) => {
    service.flickrURL = 'url';
    service.flickrQuery = '?stuff=';
    const url = 'url?stuff=flickr.photosets.getList&primary_photo_extras=url_t,url_s,url_m,url_o,path_alias,media';
    expect(service.buildAlbumUrl()).toBe(url);
  }));

  it('should build photo url', inject([FlickrService], (service: FlickrService) => {
    service.flickrURL = 'url';
    service.flickrQuery = '?stuff=';
    const url = 'url?stuff=flickr.photosets.getPhotos&photoset_id=5&extras=url_sq,url_t,url_s,url_m,url_o';
    expect(service.buildPhotoUrl(5)).toBe(url);
  }));

  it('should call get albums endpoint', inject([FlickrService], (service: FlickrService) => {
    spyOn(service, 'buildAlbumUrl').and.returnValue('/fake/album/url');
    const response = service.getAlbums();
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/fake/album/url');
  }));

  it('should call get photos endpoint', inject([FlickrService], (service: FlickrService) => {
    spyOn(service, 'buildPhotoUrl').and.returnValue('/fake/photo/url');
    const response = service.getPhotos(5);
    expect(response).toBe('stuff');
    expect(MockHttp.get).toHaveBeenCalledWith('/fake/photo/url');
  }));
});
