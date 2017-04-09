/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule } from '@angular/material';
import { MdDialogModule } from '@angular/material';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';
import { User } from '../../models/user';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  const userServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    getUser: jasmine.createSpy('getUser'),
    remove: jasmine.createSpy('remove')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  userServiceMock.getAll.and.returnValue(fakeSubscribe);
  userServiceMock.remove.and.returnValue(fakeSubscribe);
  const authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeSubscribe.subscribe.calls.reset();
    userServiceMock.getAll.calls.reset();
    userServiceMock.remove.calls.reset();
    authServiceMock.logout.calls.reset();
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(userServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateUsers, component.handleError);
  });

  it('should populate users', () => {
    const users = { data: [{ firstName: 'test', isAdmin: false}, { firstName: 'test2', isAdmin: false}] };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(users);
    component.populateUsers(data);
    expect(component.users.length).toBe(2);
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
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deleteUser);
  });

  describe('deleteUser', () => {
    it('should delete user when confirmed', () => {
      component.key = 5;
      component.deleteUser(true);
      expect(userServiceMock.remove).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleDelete);
    });

    it('should not delete user when canceled', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.key = 5;
      component.deleteUser(undefined);
      expect(userServiceMock.remove).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  it('should handle delete', () => {
    component.key = 5;
    const user1 = new User('test', 'testerson', '', '', false);
    user1.id = 5;
    const user2 = new User('name', 'last', '', '', false);
    user2.id = 2;
    component.users.push(user1);
    component.users.push(user2);
    component.handleDelete();
    expect(component.users.length).toBe(1);
  });
});
