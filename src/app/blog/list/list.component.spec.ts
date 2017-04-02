/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Post } from '../../models/post';

import { ListComponent } from './list.component';
import { TitleService } from '../../services/title/title.service';
import { PostService } from '../../services/post/post.service';
import { MomentModule } from 'angular2-moment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  const TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  const PostServiceMock = {
    getAllPublishedPersonal: jasmine.createSpy('getAllPublishedPersonal')
  };
  PostServiceMock.getAllPublishedPersonal.and.returnValue(fakeSubscribe);
  const activatedRouteMock = {
    params: fakeSubscribe
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
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: PostService, useValue: PostServiceMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    PostServiceMock.getAllPublishedPersonal.calls.reset();
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
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Blog');
  });

  describe('processRoute', () => {
    it('should process route when params exist and get posts', () => {
      const params = { page: '2' };
      component.processRoute(params);
      expect(PostServiceMock.getAllPublishedPersonal).toHaveBeenCalledWith(2);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePosts);
    });
    it('should process route when no params exist and get posts', () => {
      const params = {};
      component.processRoute(params);
      expect(PostServiceMock.getAllPublishedPersonal).toHaveBeenCalledWith(1);
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
