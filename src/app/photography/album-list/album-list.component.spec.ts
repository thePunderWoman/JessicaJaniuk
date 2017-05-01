import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumListComponent } from './album-list.component';
import { FlickrService } from '../../services/flickr/flickr.service';
import { RouterTestingModule } from '@angular/router/testing';
import { MetaService } from '../../services/meta/meta.service';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  const flickrServiceMock = {
    getAlbums: jasmine.createSpy('getAlbums'),
    getPhotos: jasmine.createSpy('getPhotos')
  };
  const fakeObservable = {
    subscribe: jasmine.createSpy('subscribe')
  };

  flickrServiceMock.getAlbums.and.returnValue(fakeObservable);
  flickrServiceMock.getPhotos.and.returnValue(fakeObservable);

  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');

  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: FlickrService, useValue: flickrServiceMock },
        { provide: MetaService, useValue: MetaServiceMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(flickrServiceMock.getAlbums).toHaveBeenCalled();
    expect(fakeObservable.subscribe).toHaveBeenCalledWith(component.handleAlbums);
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith('Photography');
  });

  it('should handle photo data', () => {
    const fakeData = {
      json: jasmine.createSpy('json')
    };
    const photoData = {
      photosets: {
        photoset: [
          { name: 'stuff' },
          { name: 'things' }
        ]
      }
    };
    fakeData.json.and.returnValue(photoData);

    component.handleAlbums(fakeData);
    expect(component.show).toBeTruthy();
    expect(component.albums).toEqual(photoData.photosets.photoset);
  });
});
