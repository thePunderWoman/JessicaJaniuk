/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { FlickrService } from './flickr.service';
import { MockBackend } from '@angular/http/testing';
import { Http } from '@angular/http';

describe('FlickrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlickrService,
        { provide: Http, useValue: MockBackend }
      ],
    });
  });

  it('should ...', inject([FlickrService], (service: FlickrService) => {
    expect(service).toBeTruthy();
  }));
});
