import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ConnectComponent } from './connect.component';
import { MetaService } from '../services/meta/meta.service';
import { PageService } from '../services/page/page.service';
import { ConnectionService } from '../services/connection/connection.service';
import { FullUrlService } from '../services/fullUrl/fullUrl.service';
import { ActivatedRoute } from '@angular/router';

describe('ConnectComponent', () => {
  let component: ConnectComponent;
  let fixture: ComponentFixture<ConnectComponent>;
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag'),
    setPageTag: jasmine.createSpy('setPageTag'),
  };
  const fbList = { subscribe: jasmine.createSpy('subscribe') };
  const FullUrlServiceMock = {
    url: jasmine.createSpy('url')
  };
  FullUrlServiceMock.url.and.returnValue('testurl');
  const ConnectionServiceMock = {
    getAll: jasmine.createSpy('getAll')
  };
  const fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
  ConnectionServiceMock.getAll.and.returnValue(fakeSubscribe);
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
    ConnectionServiceMock.getAll.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    TestBed.configureTestingModule({
      declarations: [ ConnectComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: MetaService, useValue: MetaServiceMock },
        { provide: ConnectionService, useValue: ConnectionServiceMock },
        { provide: FullUrlService, useValue: FullUrlServiceMock },
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

  it('should handle connection data', () => {
    const connections = { json: jasmine.createSpy('json') };
    const connectionData = { data: [{ id: 5, name: 'connection' }, { id: 2, name: 'other'}] };
    connections.json.and.returnValue(connectionData);
    component.handleConnections(connections);
    expect(component.items.length).toBe(2);
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(component.body).toBe('content');
    expect(component.title).toBe('titlestuff');
    expect(component.show).toBeTruthy();
    expect(ConnectionServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleConnections);
  });

  it('should setMetaTags', () => {
    component.setMetaTags(pageData);
    expect(FullUrlServiceMock.url).toHaveBeenCalled();
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith(pageData.data.title);
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith({ property: 'og:title', content: pageData.data.title });
    expect(MetaServiceMock.setTag).toHaveBeenCalledWith({ property: 'og:url', content: 'testurl' });
    expect(MetaServiceMock.setPageTag).toHaveBeenCalledWith({ property: 'stuff', content: 'things' });
  });

});
