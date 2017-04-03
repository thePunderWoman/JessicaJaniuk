import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumComponent } from './album.component';
import { FlickrService } from '../../services/flickr/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MetaService } from '@nglibs/meta';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag')
  };

  const fakeData = {
    json: jasmine.createSpy('json')
  };
  const photoData = {
    photoset: {
      title: 'album of stuff',
      photo: [
        { name: 'stuff' },
        { name: 'things' }
      ]
    }
  };
  fakeData.json.and.returnValue(photoData);

  const activatedRouteMock = {
    snapshot: {
      data: {
        'album': fakeData
      }
    }
  };

  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: MetaService, useValue: MetaServiceMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.photos = [];
    component.ngOnInit();
    expect(component.show).toBeTruthy();
    expect(component.photos).toEqual(photoData.photoset.photo);
    expect(component.title).toBe(photoData.photoset.title);
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith('album of stuff');
  });
});
