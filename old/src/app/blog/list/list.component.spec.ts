import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../models/post';

import { ListComponent } from './list.component';
import { MetaService } from '../../services/meta/meta.service';
import { PostService } from '../../services/post/post.service';
import { MomentModule } from 'angular2-moment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag')
 };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  const PostServiceMock = {
    getAllPublishedByCategory: jasmine.createSpy('getAllPublishedByCategory')
  };
  PostServiceMock.getAllPublishedByCategory.and.returnValue(fakeSubscribe);
  const activatedRouteMock = {
    params: fakeSubscribe,
    snapshot: {
      data: {
        title: 'Blog',
        category: 'personal'
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        MomentModule,
        RouterTestingModule
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: MetaService, useValue: MetaServiceMock },
        { provide: PostService, useValue: PostServiceMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    PostServiceMock.getAllPublishedByCategory.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.processRoute);
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith('Blog');
  });

  describe('processRoute', () => {
    it('should process route when params exist and get posts', () => {
      const params = { page: '2' };
      component.processRoute(params);
      expect(PostServiceMock.getAllPublishedByCategory).toHaveBeenCalledWith('personal', 2, 5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePosts);
    });
    it('should process route when no params exist and get posts', () => {
      const params = {};
      component.processRoute(params);
      expect(PostServiceMock.getAllPublishedByCategory).toHaveBeenCalledWith('personal', 1, 5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePosts);
    });
  });

  it('should populate posts', () => {
    component.show = false;
    spyOn(component, 'setPages');
    const posts = { data: { count: 2, posts: [{ id: 5, title: 'stuff', content: 'things'}, { id: 3, title: 'fake', content: 'item'}] } };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(posts);
    component.populatePosts(data);
    expect(component.posts.length).toBe(2);
    expect(component.show).toBeTruthy();
    expect(component.setPages).toHaveBeenCalled();
  });

  it('should set pages', () => {
    component.totalPosts = 15;
    component.perPage = 10;
    component.setPages();
    expect(component.pages).toBe(2);
  });
});
