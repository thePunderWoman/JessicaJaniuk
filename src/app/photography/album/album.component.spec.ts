/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumComponent } from './album.component';
import { FlickrService } from '../../services/flickr.service';
import { ActivatedRoute } from '@angular/router';

describe('AlbumComponent', () => {
  let component: AlbumComponent;
  let fixture: ComponentFixture<AlbumComponent>;
  let flickrServiceMock = {
    getAlbums: jasmine.createSpy('getAlbums'),
    getPhotos: jasmine.createSpy('getPhotos')
  };
  let fakeObservable = {
    subscribe: jasmine.createSpy('subscribe')
  };

  flickrServiceMock.getAlbums.and.returnValue(fakeObservable);
  flickrServiceMock.getPhotos.and.returnValue(fakeObservable);

  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 'things'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumComponent ],
      providers: [
        { provide: FlickrService, useValue: flickrServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
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
});
