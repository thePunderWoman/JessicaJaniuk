/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConnectComponent } from './connect.component';
import { AngularFire } from 'angularfire2';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fbList = { subscribe: jasmine.createSpy('subscribe') };
  let PageServiceMock = {
    getByKey: jasmine.createSpy('getByKey')
  };
  let fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
  PageServiceMock.getByKey.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    let AngularFireStub = {
      database: {
        list: () => fbList
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ConnectComponent ],
      providers: [
        { provide: AngularFire, useValue: AngularFireStub },
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: PageService, useValue: PageServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.items).toBe(fbList);
  });

  it('should handle page data', () => {
    let data = { json: jasmine.createSpy('json') };
    let pageData = { data: { content: 'content', title: 'titlestuff' } };
    data.json.and.returnValue(pageData);
    component.handlePage(data);
    expect(component.body).toBe('content');
    expect(component.title).toBe('titlestuff');
    expect(component.show).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Connect');
    expect(PageServiceMock.getByKey).toHaveBeenCalledWith('connect');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handlePage);
  });
});
