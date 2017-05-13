import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DetailComponent } from './detail.component';
import { Post } from '../../models/post';
import { MetaService } from '../../services/meta/meta.service';
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
    setTag: jasmine.createSpy('setTag'),
    setPageTag: jasmine.createSpy('setPageTag'),
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
    Category: {
      name: 'Personal'
    },
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
    spyOn(component, 'setMetaTags');
    component.ngOnInit();
    expect(component.post).toBe(post);
    expect(component.show).toBeTruthy();
    expect(component.setMetaTags).toHaveBeenCalled();
  });

  it('should set meta tags', () => {
    component.post = new Post(post);
    component.post.meta = post.Meta;
    component.setMetaTags();
    expect(FullUrlServiceMock.url).toHaveBeenCalled();
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith(post.title);
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith({ property: 'og:title', content: post.title });
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith({ property: 'og:type', content: 'article' });
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith({ property: 'og:url', content: 'testurl' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'article:published_time', content: post.publishDate.toString() });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'article:modified_time', content: post.publishDate.toString() });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'article:section', content: 'Personal' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'article:author',
      content: 'https://www.facebook.com/jessica.janiuk' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'og:description', content: '' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'og:image',
      content: 'https://jessicajaniuk.com/assets/blog-post-image.png' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'stuff', content: 'things' });
  });
});
