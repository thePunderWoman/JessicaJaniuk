/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { Post } from '../../models/post';

import { ListComponent } from './list.component';
import { TitleService } from '../../services/title/title.service';
import { AngularFire } from 'angularfire2';
import { MomentModule } from 'angular2-moment';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };

  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list')
    }
  };

  AngularFireMock.database.list.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [
        MomentModule
      ],
      providers: [
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: AngularFire, useValue: AngularFireMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(AngularFireMock.database.list).toHaveBeenCalledWith('/blog/post', { query:  {
        orderByChild: 'PublishDate',
        endAt: component.now.toISOString()
      }
    });
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePosts);
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Blog');
  });

  it('should populate posts', () => {
    spyOn(component, 'sortPosts');
    let post1 = new Post();
    post1.Published = true;
    let post2 = new Post();
    post2.Published = false;
    let post3 = new Post();
    post3.Published = true;
    let posts = [ post1, post2, post3 ];
    component.populatePosts(posts);
    expect(component.posts.length).toBe(2);
    expect(component.sortPosts).toHaveBeenCalled();
  });

  it('should sort posts', () => {
    let post1 = new Post();
    post1.PublishDate = new Date(2017, 1, 5).toISOString();
    let post2 = new Post();
    post2.PublishDate = new Date(2017, 1, 4).toISOString();
    let post3 = new Post();
    post3.PublishDate = new Date(2017, 1, 6).toISOString();
    let post4 = new Post();
    post4.PublishDate = new Date(2017, 1, 5).toISOString();
    expect(component.sortPosts(post2, post1)).toBe(1);
    expect(component.sortPosts(post3, post1)).toBe(-1);
    expect(component.sortPosts(post1, post4)).toBe(0);
  });
});
