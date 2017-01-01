/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TitleService } from './title.service';
import { Title } from '@angular/platform-browser';

describe('TitleService', () => {
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TitleService,
        { provide: Title, useValue: TitleServiceMock }
      ]
    });
  });

  it('should ...', inject([TitleService], (service: TitleService) => {
    expect(service).toBeTruthy();
  }));

  it('should set title and append website name', inject([TitleService], (service: TitleService) => {
    service.setTitle('test');
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('test | Jessica Janiuk');
  }));
});
