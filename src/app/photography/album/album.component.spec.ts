/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumComponent } from './album.component';
import { FlickrService } from '../../services/flickr/flickr.service';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TitleService } from '../../services/title/title.service';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  const flickrServiceMock = {
    getAlbums: jasmine.createSpy('getAlbums'),
    getPhotos: jasmine.createSpy('getPhotos')
  };
  const fakeObservable = {
    subscribe: jasmine.createSpy('subscribe')
  };
  const TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };

  flickrServiceMock.getAlbums.and.returnValue(fakeObservable);
  flickrServiceMock.getPhotos.and.returnValue(fakeObservable);

  const activatedRouteMock = {
    snapshot: {
      params: {
        'id': 'things'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: FlickrService, useValue: flickrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TitleService, useValue: TitleServiceMock }
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
    component.ngOnInit();
    expect(flickrServiceMock.getPhotos).toHaveBeenCalledWith('things');
    expect(fakeObservable.subscribe).toHaveBeenCalledWith(component.handlePhotos);
  });

  it('should handle photo data', () => {
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

    component.handlePhotos(fakeData);
    expect(component.show).toBeTruthy();
    expect(component.photos).toEqual(photoData.photoset.photo);
    expect(component.title).toBe(photoData.photoset.title);
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('album of stuff');
  });
});
