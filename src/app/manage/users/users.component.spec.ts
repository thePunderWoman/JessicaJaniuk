/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { UsersComponent } from './users.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule } from '@angular/material/icon';
import { MdDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user/user.service';
import { AuthService } from '../../services/auth/auth.service';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;
  let userServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    getUser: jasmine.createSpy('getUser'),
    remove: jasmine.createSpy('remove')
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  userServiceMock.getAll.and.returnValue(fakeSubscribe);
  userServiceMock.remove.and.returnValue(fakeSubscribe);
  let authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsersComponent ],
      imports: [
        RouterTestingModule,
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
    let users = { data: [{ firstName: 'test', isAdmin: false}, { firstName: 'test2', isAdmin: false}] };
    let data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(users);
    component.populateUsers(data);
    expect(component.users.length).toBe(2);
  });

  describe('handleError', () => {
    it('should log out and redirect on 401', () => {
      let err = { status: 401 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['/auth']);
    });
    it('should not log out or redirect on any other error', () => {
      let err = { status: 500 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(component.router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should confirm delete', () => {
    let refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
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
      expect(component.key).toBeUndefined();
    });

    it('should delete user when canceled', () => {
      component.key = 5;
      component.deleteUser(undefined);
      expect(component.key).toBeUndefined();
    });
  });

});
