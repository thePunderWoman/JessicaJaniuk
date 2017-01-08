/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { Post } from '../../models/post';
import { TitleService } from '../../services/title/title.service';
import { AngularFire } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let AngularFireMock = {
    database: {
      object: jasmine.createSpy('list')
    }
  };
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 'things'
      }
    }
  };

  AngularFireMock.database.object.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      imports: [
        MomentModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: AngularFire, useValue: AngularFireMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(AngularFireMock.database.object).toHaveBeenCalledWith('/blog/post/things');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePost);
  });

  it('should populate posts', () => {
    let post = new Post();
    post.PublishDate = new Date().toUTCString();
    post.Content = 'stuff';
    post.Title = 'post title';
    post.Published = true;
    component.populatePost(post);
    expect(component.post).toBe(post);
    expect(component.show).toBeTruthy();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('post title');
  });

});
