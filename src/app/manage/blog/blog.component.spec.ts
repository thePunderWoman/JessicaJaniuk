/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Observable } from 'RxJS';
import { Post } from '../../models/post';

import { BlogComponent } from './blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire } from 'angularfire2';
import { MomentModule } from 'angular2-moment';
import { MdIconModule } from '@angular/material/icon';
import { MdDialogModule } from '@angular/material/dialog';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list'),
      object: jasmine.createSpy('object')
    }
  };

  let fakePost = jasmine.createSpyObj('post', ['remove']);
  AngularFireMock.database.object.and.returnValue(fakePost);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [
        RouterTestingModule,
        MomentModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      providers: [
        { provide: AngularFire, useValue: AngularFireMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(AngularFireMock.database.list).toHaveBeenCalledWith('/blog/post');
  });

  it('should confirm delete', () => {
    let fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
    let refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
    refFake.afterClosed.and.returnValue(fakeSubscribe);
    spyOn(component.dialog, 'open').and.returnValue(refFake);
    component.confirmDelete('testkey');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deletePost);
  });

  describe('deletePost', () => {
    it('should delete post when confirmed', () => {
      component.key = 'testkey';
      component.deletePost(true);
      expect(AngularFireMock.database.object).toHaveBeenCalledWith('/blog/post/testkey');
      expect(fakePost.remove).toHaveBeenCalled();
      expect(component.key).toBeUndefined();
    });

    it('should delete post when canceled', () => {
      fakePost.remove.calls.reset();
      component.key = 'testkey';
      component.deletePost(undefined);
      expect(fakePost.remove).not.toHaveBeenCalled();
      expect(component.key).toBeUndefined();
    });
  });
});
