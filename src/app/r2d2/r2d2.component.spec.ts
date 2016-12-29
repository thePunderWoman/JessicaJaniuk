/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { R2d2Component } from './r2d2.component';

describe('R2d2Component', () => {
  let component: R2d2Component;
  let fixture: ComponentFixture<R2d2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R2d2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(R2d2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
