/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { HeaderComponent } from './header.component';
import { Location } from '@angular/common';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const locationMock = {
    path: jasmine.createSpy('path')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Location, useValue: locationMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isNotHome', () => {
    it('should be false if at home', () => {
      locationMock.path.and.returnValue('');
      expect(fixture.componentInstance.isNotHome()).toBeFalsy();
    });

    it('should be true if not at home', () => {
      locationMock.path.and.returnValue('/nothome');
      expect(fixture.componentInstance.isNotHome()).toBeTruthy();
    });
  });
});
