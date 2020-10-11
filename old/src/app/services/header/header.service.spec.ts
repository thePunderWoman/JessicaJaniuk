import { TestBed, async, inject } from '@angular/core/testing';
import { HeaderService } from './header.service';
import { CookieService } from 'ngx-cookie';
import { Headers } from '@angular/http';

describe('HeaderService', () => {
  const CookieServiceMock = {
    get: jasmine.createSpy('get'),
  };
  CookieServiceMock.get.and.returnValue('faketoken');

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HeaderService,
        { provide: CookieService, useValue: CookieServiceMock }
      ]
    });
  });

  it('should ...', inject([HeaderService], (service: HeaderService) => {
    expect(service).toBeTruthy();
  }));

  it('should generate headers', inject([HeaderService, CookieService], (service: HeaderService, cookieService: CookieService) => {
    const headers = service.createAuthHeaders();
    expect(headers.get('Authorization')).toBe('Bearer faketoken');
    expect(CookieServiceMock.get).toHaveBeenCalledWith('token');
  }));
});
