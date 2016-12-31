/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumListComponent } from './album-list.component';
import { FlickrService } from '../../services/flickr.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Title }     from '@angular/platform-browser';

describe('AlbumListComponent', () => {
  let component: AlbumListComponent;
  let fixture: ComponentFixture<AlbumListComponent>;
  let flickrServiceMock = {
    getAlbums: jasmine.createSpy('getAlbums'),
    getPhotos: jasmine.createSpy('getPhotos')
  };
  let fakeObservable = {
    subscribe: jasmine.createSpy('subscribe')
  };

  flickrServiceMock.getAlbums.and.returnValue(fakeObservable);
  flickrServiceMock.getPhotos.and.returnValue(fakeObservable);

  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: FlickrService, useValue: flickrServiceMock },
        { provide: Title, useValue: TitleServiceMock }
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
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Photography | Jessica Janiuk');
  });

  it('should handle photo data', () => {
    let fakeData = {
      json: jasmine.createSpy('json')
    };
    let photoData = {
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
