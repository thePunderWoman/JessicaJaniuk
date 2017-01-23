/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Post } from '../../models/post';
import { PostService } from '../../services/post/post.service';

import { PostFormComponent } from './post-form.component';
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
  let postServiceMock = {
    getById: jasmine.createSpy('getById'),
    update: jasmine.createSpy('update'),
    save: jasmine.createSpy('save'),
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  postServiceMock.getById.and.returnValue(fakeSubscribe);
  postServiceMock.update.and.returnValue(fakeSubscribe);
  postServiceMock.save.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [
        FormsModule,
        MdSlideToggleModule.forRoot(),
        MdInputModule.forRoot(),
      ],
      schemas: [
        CUSTOM_ELEMENTS_SCHEMA
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PostService, useValue: postServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    postServiceMock.getById.calls.reset();
    postServiceMock.update.calls.reset();
    postServiceMock.save.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
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
      component.id = 4;
      component.getPost();
      expect(postServiceMock.getById).toHaveBeenCalledWith(4);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePost);
    });

    it('should not get post when no id exists', () => {
      postServiceMock.getById.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.id = undefined;
      component.getPost();
      expect(postServiceMock.getById).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populatePost);
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 5;
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  it('should populate post', () => {
    let fakePost = {
      title: 'test',
      category: 'sample',
      content: '<p>Cheese</p>',
      published: false,
      publishDate: '12/12/2017',
      Tags: ['stuff', 'things']
    };
    let data = { json: jasmine.createSpy('json') };
    let response = { data: fakePost };
    data.json.and.returnValue(response);
    component.populatePost(data);
    expect(component.post.title).toBe(fakePost.title);
    expect(component.post.category).toBe(fakePost.category);
    expect(component.post.content).toBe(fakePost.content);
    expect(component.post.published).toBe(fakePost.published);
    expect(component.post.publishDate).toBe(fakePost.publishDate);
    expect(component.post.Tags).toEqual(fakePost.Tags);
  });

  describe('onSubmit', () => {
    it('should submit when no id exists', () => {
      let post = new Post();
      component.id = undefined;
      component.post = post;
      component.onSubmit();
      expect(postServiceMock.save).toHaveBeenCalledWith(component.post);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should submit when id exists', () => {
      let post = new Post();
      component.id = 5;
      component.post = post;
      component.onSubmit();
      expect(postServiceMock.update).toHaveBeenCalledWith(5, component.post);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
  });

  it('should set id result on save', () => {
    let data = { json: jasmine.createSpy('json') };
    let response = { data: { id: 6 } };
    data.json.and.returnValue(response);
    component.saving = true;
    component.id = undefined;
    component.saveComplete(data);
    expect(component.saving).toBeFalsy();
    expect(component.id).toBe(6);
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
