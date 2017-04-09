/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { User } from '../../models/user';

import { UserFormComponent } from './user-form.component';
import { ActivatedRoute } from '@angular/router';
import { MdInputModule } from '@angular/material';
import { MdSlideToggleModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('UserFormComponent', () => {
  let component: UserFormComponent;
  let fixture: ComponentFixture<UserFormComponent>;
  const activatedRouteMock = {
    snapshot: {
      params: {
        'id': 5
      }
    }
  };
  const userServiceMock = {
    getUser: jasmine.createSpy('getUser'),
    updateUser: jasmine.createSpy('updateUser'),
    saveUser: jasmine.createSpy('saveUser'),
    setPassword: jasmine.createSpy('setPassword')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  userServiceMock.getUser.and.returnValue(fakeSubscribe);
  userServiceMock.updateUser.and.returnValue(fakeSubscribe);
  userServiceMock.saveUser.and.returnValue(fakeSubscribe);
  userServiceMock.setPassword.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    userServiceMock.getUser.calls.reset();
    userServiceMock.updateUser.calls.reset();
    userServiceMock.saveUser.calls.reset();
    userServiceMock.setPassword.calls.reset();
    fakeSubscribe.subscribe.calls.reset();

    TestBed.configureTestingModule({
      declarations: [ UserFormComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MdSlideToggleModule.forRoot(),
        MdInputModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: UserService, useValue: userServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init and get user', () => {
    spyOn(component, 'getUser');
    component.ngOnInit();
    expect(component.id).toBe(5);
    expect(component.getUser).toHaveBeenCalled();
  });

  describe('getUser', () => {
    it('should get user when an id exists', () => {
      component.id = 5;
      component.getUser();
      expect(userServiceMock.getUser).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateUser);
    });
    it('should not get user when no id', () => {
      userServiceMock.getUser.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.id = undefined;
      component.getUser();
      expect(userServiceMock.getUser).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  describe('populateUser', () => {
    it('should set user if data is present', () => {
      const data = { json: jasmine.createSpy('json') };
      const response = { data: { id: 4, firstName: 'test' } };
      data.json.and.returnValue(response);
      component.populateUser(data);
      expect(component.user.id).toBe(4);
      expect(component.user.firstName).toBe('test');
    });
    it('should not set user if data is not present', () => {
      const data = { json: jasmine.createSpy('json') };
      const response = { data: undefined };
      data.json.and.returnValue(response);
      component.populateUser(data);
      expect(component.user.id).toBeUndefined();
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 5;
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  describe('onSubmit', () => {
    it('should save new user when no id', () => {
      const user = new User('test', '', '', '', false);
      component.id = undefined;
      component.user = user;
      component.onSubmit();
      expect(userServiceMock.saveUser).toHaveBeenCalledWith(component.user);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should update existing user when id exists', () => {
      const user = new User('test', '', '', '', false);
      component.id = 5;
      component.user = user;
      component.onSubmit();
      expect(userServiceMock.updateUser).toHaveBeenCalledWith(5, component.user);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
  });

  it('should wipe passwords on completed save', () => {
    const data = { json: jasmine.createSpy('json') };
    const response = { data: { id: 6 } };
    data.json.and.returnValue(response);
    component.password = 'stuff';
    component.confirmPassword = 'things';
    component.saveComplete(data);
    expect(component.password).toBe('');
    expect(component.confirmPassword).toBe('');
    expect(component.id).toBe(6);
  });

  describe('onChangePassword', () => {
    it('should save password when criteria met', () => {
      component.id = 5;
      component.password = 'stuff';
      component.confirmPassword = 'stuff';
      component.onChangePassword();
      expect(userServiceMock.setPassword).toHaveBeenCalledWith(5, 'stuff');
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should not save password when password is empty', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.id = 5;
      component.password = '';
      component.confirmPassword = 'stuff';
      component.onChangePassword();
      expect(userServiceMock.setPassword).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
    it('should not save password when confirm password is empty', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.id = 5;
      component.password = 'stuff';
      component.confirmPassword = '';
      component.onChangePassword();
      expect(userServiceMock.setPassword).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
    it('should not save password when passwords do not match', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.id = 5;
      component.password = 'stuff';
      component.confirmPassword = 'things';
      component.onChangePassword();
      expect(userServiceMock.setPassword).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });
});
