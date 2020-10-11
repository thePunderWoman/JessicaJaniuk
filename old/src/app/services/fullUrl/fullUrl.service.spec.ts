import { TestBed, async, inject } from '@angular/core/testing';
import { FullUrlService } from './fullUrl.service';
import { Location } from '@angular/common';

describe('FullUrlService', () => {
  const LocationServiceMock = {
    path: jasmine.createSpy('path'),
  };
  LocationServiceMock.path.and.returnValue('/stuff');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FullUrlService,
        { provide: Location, useValue: LocationServiceMock }
      ]
    });
  });

  it('should ...', inject([FullUrlService], (service: FullUrlService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate headers', inject([FullUrlService, Location], (service: FullUrlService, location: Location) => {
    service.baseUrl = 'root';
    const url = service.url();
    expect(url).toBe('root/stuff');
  }));
});
