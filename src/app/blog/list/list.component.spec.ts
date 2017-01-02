/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListComponent } from './list.component';
import { TitleService } from '../../services/title/title.service';
import { AuthService } from '../../services/auth/auth.service';

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };

  let AuthServiceMock = {
    isAdmin: jasmine.createSpy('isAdmin'),
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [
        { provide: TitleService, useValue: TitleServiceMock },
        { provide: AuthService, useValue: AuthServiceMock }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('Blog');
  });

  describe('showAdd', () => {
    it('should not show if not admin', () => {
      AuthServiceMock.isAdmin.and.returnValue(false);
      expect(component.showAdd()).toBeFalsy();
    });
    it('should not show if logged in and not admin', () => {
      AuthServiceMock.isAdmin.and.returnValue(true);
      expect(component.showAdd()).toBeTruthy();
    });
  });

});
