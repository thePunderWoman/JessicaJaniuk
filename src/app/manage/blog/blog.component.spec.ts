/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Post } from '../../models/post';
import { PostService } from '../../services/post/post.service';
import { AuthService } from '../../services/auth/auth.service';

import { BlogComponent } from './blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MomentModule } from 'angular2-moment';
import { MdIconModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;

  const fakePost = jasmine.createSpyObj('post', ['remove']);
  const postServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    remove: jasmine.createSpy('remove')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  postServiceMock.getAll.and.returnValue(fakeSubscribe);
  postServiceMock.remove.and.returnValue(fakeSubscribe);
  const authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [
        RouterTestingModule,
        MomentModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: PostService, useValue: postServiceMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeSubscribe.subscribe.calls.reset();
    postServiceMock.getAll.calls.reset();
    postServiceMock.remove.calls.reset();
    authServiceMock.logout.calls.reset();
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(component, 'getPosts');
    component.ngOnInit();
    expect(component.getPosts).toHaveBeenCalled();
  });

  it('should get posts', () => {
    component.getPosts();
    expect(postServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePosts, component.handleError);
  });

  it('should populate posts', () => {
    const posts = { data: { count: 2, posts: [{ id: 5, title: 'stuff', content: 'things'}, { id: 3, title: 'fake', content: 'item'}] } };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(posts);
    component.populatePosts(data);
    expect(component.posts.length).toBe(2);
  });

  describe('handleError', () => {
    it('should log out and redirect on 401', () => {
      const err = { status: 401 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['/auth']);
    });
    it('should not log out or redirect on any other error', () => {
      const err = { status: 500 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(component.router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should confirm delete', () => {
    const refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
    refFake.afterClosed.and.returnValue(fakeSubscribe);
    spyOn(component.dialog, 'open').and.returnValue(refFake);
    component.confirmDelete('testkey');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deletePost);
  });

  describe('deletePost', () => {
    it('should delete post when confirmed', () => {
      component.key = 5;
      component.deletePost(true);
      expect(postServiceMock.remove).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleDelete);
    });

    it('should not delete user when canceled', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.key = 5;
      component.deletePost(undefined);
      expect(postServiceMock.remove).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  it('should handle delete', () => {
    spyOn(component, 'getPosts');
    component.key = 5;
    component.handleDelete();
    expect(component.key).toBeUndefined();
    expect(component.getPosts).toHaveBeenCalled();
  });
});
