/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { Post } from '../../models/post';
import { TitleService } from '../../services/title/title.service';
import { MomentModule } from 'angular2-moment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from '../../services/post/post.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 3
      }
    }
  };
  let PostServiceMock = {
    getById: jasmine.createSpy('getById')
  };
  PostServiceMock.getById.and.returnValue(fakeSubscribe);

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
        { provide: PostService, useValue: PostServiceMock }
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
    expect(PostServiceMock.getById).toHaveBeenCalledWith(3);
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePost);
  });

  it('should populate posts', () => {
    let post = new Post();
    post.publishDate = new Date();
    post.content = 'stuff';
    post.title = 'post title';
    post.published = true;
    let postdata = { data: post };
    let data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(postdata);
    component.populatePost(data);
    expect(component.post).toBe(post);
    expect(component.show).toBeTruthy();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('post title');
  });

});
