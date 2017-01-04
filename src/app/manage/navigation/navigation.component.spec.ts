/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ManageNavigationComponent } from './navigation.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';

describe('NavigationComponent', () => {
  let component: ManageNavigationComponent;
  let fixture: ComponentFixture<ManageNavigationComponent>;
  let AuthServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageNavigationComponent ],
      imports: [ RouterTestingModule ],
      providers: [
      { provide: AuthService, useValue: AuthServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should log out', () => {
    component.logout();
    expect(AuthServiceMock.logout).toHaveBeenCalled();
  });
});
