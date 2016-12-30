/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AlbumListComponent } from './album-list.component';
import { FlickrService } from '../../services/flickr.service';
import { RouterTestingModule } from '@angular/router/testing';

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

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumListComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: FlickrService, useValue: flickrServiceMock }
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
});
