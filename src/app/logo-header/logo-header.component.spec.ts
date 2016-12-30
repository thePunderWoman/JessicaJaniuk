/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { LogoHeaderComponent } from './logo-header.component';
import { Router } from '@angular/router';
import { NavigationComponent } from '../navigation/navigation.component';

describe('LogoHeaderComponent', () => {
  let component: LogoHeaderComponent;
  let fixture: ComponentFixture<LogoHeaderComponent>;
  let routerStub = { url: '/' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogoHeaderComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: NavigationComponent, useValue: NavigationComponent },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogoHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isNotHome', () => {
    it('should be false if at home', () => {
      component.router.url = '/';
      expect(component.isNotHome()).toBeFalsy();
    });

    it('should be true if not at home', () => {
      component.router.url = '/nothome';
      expect(component.isNotHome()).toBeTruthy();
    });
  });
});
