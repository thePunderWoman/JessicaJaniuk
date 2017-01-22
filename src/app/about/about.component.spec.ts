/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutComponent } from './about.component';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let PageServiceMock = {
    getByKey: jasmine.createSpy('getByKey')
  };
  let fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
  PageServiceMock.getByKey.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: [
        { provide: PageService, useValue: PageServiceMock },
        { provide: TitleService, useValue: TitleServiceMock },
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
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('About Me');
    expect(PageServiceMock.getByKey).toHaveBeenCalledWith('aboutme');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handlePage);
  });

  it('should handle page data', () => {
    let data = { json: jasmine.createSpy('json') };
    let pageData = { content: 'content', title: 'titlestuff' };
    data.json.and.returnValue(pageData);
    component.handlePage(data);
    expect(component.body).toBe('content');
    expect(component.title).toBe('titlestuff');
    expect(component.show).toBeTruthy();
  });
});
