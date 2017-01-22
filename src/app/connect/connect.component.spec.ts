/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConnectComponent } from './connect.component';
import { TitleService } from '../services/title/title.service';
import { PageService } from '../services/page/page.service';
import { ConnectionService } from '../services/connection/connection.service';

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
  let ConnectionServiceMock = {
    getAll: jasmine.createSpy('getAll')
  };
  let fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
  PageServiceMock.getByKey.and.returnValue(fakeSubscribe);
  ConnectionServiceMock.getAll.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    ConnectionServiceMock.getAll.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    TestBed.configureTestingModule({
      declarations: [ ConnectComponent ],
      providers: [
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: PageService, useValue: PageServiceMock },
        { provide: ConnectionService, useValue: ConnectionServiceMock },
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

  it('should handle connection data', () => {
    let data = { json: jasmine.createSpy('json') };
    let connectionData = { data: [{ id: 5, name: 'connection' }, { id: 2, name: 'other'}] };
    data.json.and.returnValue(connectionData);
    component.handleConnections(data);
    expect(component.items.length).toBe(2);
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Connect');
    expect(PageServiceMock.getByKey).toHaveBeenCalledWith('connect');
    expect(ConnectionServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handlePage);
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleConnections);
  });
});
