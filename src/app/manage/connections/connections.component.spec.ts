/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { ConnectionsComponent } from './connections.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { ConnectionService } from '../../services/connection/connection.service';
import { AuthService } from '../../services/auth/auth.service';
import { Connection } from '../../models/connection';


describe('ConnectionsComponent', () => {
  let component: ConnectionsComponent;
  let fixture: ComponentFixture<ConnectionsComponent>;
  const connectionServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    remove: jasmine.createSpy('remove')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  connectionServiceMock.getAll.and.returnValue(fakeSubscribe);
  connectionServiceMock.remove.and.returnValue(fakeSubscribe);
  const authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConnectionsComponent ],
      imports: [
        RouterTestingModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ConnectionService, useValue: connectionServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeSubscribe.subscribe.calls.reset();
    connectionServiceMock.getAll.calls.reset();
    connectionServiceMock.remove.calls.reset();
    authServiceMock.logout.calls.reset();
    fixture = TestBed.createComponent(ConnectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(connectionServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateConnections, component.handleError);
  });

  it('should populate connections', () => {
    const connections = { data: [{ id: 1, name: 'fb'}, { id: 2, name: 'tw'}] };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(connections);
    component.populateConnections(data);
    expect(component.connections.length).toBe(2);
  });

  describe('handleError', () => {
    it('should log out and redirect on 401', () => {
      const err = { status: 401 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['/auth']);
    });
    it('should not log out or redirect on any other error', () => {
      const err = { status: 500 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(component.router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should confirm delete', () => {
    const refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
    refFake.afterClosed.and.returnValue(fakeSubscribe);
    spyOn(component.dialog, 'open').and.returnValue(refFake);
    component.confirmDelete('testkey');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deleteConnection);
  });

  describe('deleteConnection', () => {
    it('should delete connection when confirmed', () => {
      component.key = 5;
      component.deleteConnection(true);
      expect(connectionServiceMock.remove).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleDelete);
    });

    it('should not delete connection when canceled', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.key = 5;
      component.deleteConnection(undefined);
      expect(connectionServiceMock.remove).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  it('should handle delete', () => {
    component.key = 5;
    const conn1 = new Connection('test', 'testerson', '', '');
    conn1.id = 5;
    const conn2 = new Connection('name', 'last', '', '');
    conn2.id = 2;
    component.connections.push(conn1);
    component.connections.push(conn2);
    component.handleDelete();
    expect(component.connections.length).toBe(1);
  });
});
