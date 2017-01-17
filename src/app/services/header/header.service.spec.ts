/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderService } from './header.service';
import { StorageService } from '../storage/storage.service';
import { Headers } from '@angular/http';

describe('HeaderService', () => {
  let StorageServiceMock = {
    get: jasmine.createSpy('get'),
  };
  StorageServiceMock.get.and.returnValue('{ "token": "faketoken" }');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        { provide: StorageService, useValue: StorageServiceMock }
      ]
    });
  });

  it('should ...', inject([HeaderService], (service: HeaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate headers', inject([HeaderService, StorageService], (service: HeaderService, storageService: StorageService) => {
    let headers = service.createAuthHeaders();
    expect(headers.get('Authorization')).toBe('Bearer faketoken');
    expect(StorageServiceMock.get).toHaveBeenCalledWith('token');
  }));
});
