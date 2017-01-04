/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post';

import { PostFormComponent } from './post-form.component';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { MdInputModule } from '@angular/material/input';
import { MdSlideToggleModule } from '@angular/material/slide-toggle';

describe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 'things'
      }
    }
  };
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list'),
      object: jasmine.createSpy('object')
    }
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let fakeArray = {
    push: jasmine.createSpy('push')
  };
  let fakeThenable = {
    then: jasmine.createSpy('then')
  };
  fakeArray.push.and.returnValue(fakeThenable);
  AngularFireMock.database.object.and.returnValue(fakeSubscribe);
  AngularFireMock.database.list.and.returnValue(fakeArray);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [
        FormsModule,
        MdSlideToggleModule.forRoot(),
        MdInputModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AngularFire, useValue: AngularFireMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getPost');
    component.ngOnInit();
    expect(component.getPost).toHaveBeenCalled();
  });

  describe('getPost', () => {
    it('should get post when an id exists', () => {
      component.id = 'things';
      component.getPost();
      expect(AngularFireMock.database.object).toHaveBeenCalledWith('/blog/post/things');
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePost);
    });

    it('should not get post when no id exists', () => {
      component.id = undefined;
      AngularFireMock.database.object.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.getPost();
      expect(AngularFireMock.database.object).not.toHaveBeenCalledWith('/blog/post/things');
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populatePost);
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 'stuff';
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  it('should populate post', () => {
    let fakePost = {
      Title: 'test',
      Category: 'sample',
      Content: '<p>Cheese</p>',
      Published: false,
      PublishDate: '12/12/2017',
      Tags: ['stuff', 'things']
    };
    component.populatePost(fakePost);
    expect(component.post.Title).toBe(fakePost.Title);
    expect(component.post.Category).toBe(fakePost.Category);
    expect(component.post.Content).toBe(fakePost.Content);
    expect(component.post.Published).toBe(fakePost.Published);
    expect(component.post.PublishDate).toBe(fakePost.PublishDate);
    expect(component.post.Tags).toEqual(fakePost.Tags);
  });

  describe('onSubmit', () => {
    it('should submit when id exists', () => {
      component.post = new Post();
      component.fbPost = new FirebaseObjectObservable<Post>();
      spyOn(component.fbPost, 'set');
      component.id = 'test';
      component.onSubmit();
      expect(component.fbPost.set).toHaveBeenCalledWith(component.post);
    });
    it('should submit when no id exists', () => {
      component.post = new Post();
      component.id = undefined;
      component.onSubmit();
      expect(AngularFireMock.database.list).toHaveBeenCalledWith('/blog/post');
      expect(fakeArray.push).toHaveBeenCalledWith(component.post);
      expect(fakeThenable.then).toHaveBeenCalledWith(component.setId);
    });
  });

  it('should set id', () => {
    component.setId({ key: '5' });
    expect(component.id).toBe('5');
  });

  describe('addTag', () => {
    it('should not add when tag is empty space', () => {
      component.tag = ' ';
      component.addTag();
      expect(component.post.Tags).toEqual([]);
    });
    it('should not add when tag is already present', () => {
      component.post.Tags.push('test');
      component.tag = ' Test ';
      component.addTag();
      expect(component.post.Tags).toEqual(['test']);
    });
    it('should add when tag is new', () => {
      component.post.Tags.push('test');
      component.tag = 'stuff';
      component.addTag();
      expect(component.post.Tags).toEqual(['test', 'stuff']);
      expect(component.tag).toBe('');
    });
  });

  describe('removeTag', () => {
    it('should remove tag if exists', () => {
      component.post.Tags.push('test');
      component.removeTag('test');
      expect(component.post.Tags).toEqual([]);
    });
    it('should do nothing if tag does not exist', () => {
      component.post.Tags.push('test');
      component.removeTag('stuff');
      expect(component.post.Tags).toEqual(['test']);
    });
  });
});
