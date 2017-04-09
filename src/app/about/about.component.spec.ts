import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutComponent } from './about.component';
import { MetaService } from '@nglibs/meta';
import { FullUrlService } from '../services/fullUrl/fullUrl.service';
import { ActivatedRoute } from '@angular/router';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag'),
  };
  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');
  const fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
  const data = { json: jasmine.createSpy('json') };
  const pageData = { data: { content: 'content', title: 'titlestuff', Meta: [{tag: 'stuff', value: 'things'}] } };
  data.json.and.returnValue(pageData);
  const activatedRouteMock = {
    snapshot: {
      data: {
        page: data
      }
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: MetaService, useValue: MetaServiceMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    spyOn(component, 'setMetaTags');
    component.ngOnInit();
    expect(component.body).toBe('content');
    expect(component.title).toBe('titlestuff');
    expect(component.show).toBeTruthy();
    expect(component.setMetaTags).toHaveBeenCalledWith(pageData);
  });

  it('should setMetaTags', () => {
    component.setMetaTags(pageData);
    expect(FullUrlServiceMock.url).toHaveBeenCalled();
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith(pageData.data.title);
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('og:title', pageData.data.title);
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('og:type', 'profile');
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('og:url', 'testurl');
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('profile:first_name', 'Jessica');
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('profile:last_name', 'Janiuk');
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('profile:gender', 'female');
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith('stuff', 'things');
  });
});
