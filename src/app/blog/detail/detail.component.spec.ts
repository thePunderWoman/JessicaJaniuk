import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { Post } from '../../models/post';
import { MetaService } from '@nglibs/meta';
import { MomentModule } from 'angular2-moment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from '../../services/post/post.service';
import { FullUrlService } from '../../services/fullUrl/fullUrl.service';

describe('DetailComponent', () => {
  let component: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag')
  };
  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');
  const post = {
    publishDate: new Date(),
    content: 'stuff',
    title: 'post title',
    published: true,
    Meta: [{tag: 'stuff', value: 'things'}]
  };
  const postdata = { data: post };
  const data = { json: jasmine.createSpy('json') };
  data.json.and.returnValue(postdata);
  const activatedRouteMock = {
    snapshot: {
      data: {
        post: data
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailComponent ],
      imports: [
        MomentModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
        { provide: MetaService, useValue: MetaServiceMock }
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
    expect(component.post).toBe(post);
    expect(component.show).toBeTruthy();
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith('post title');
  });
});
