/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { R2d2Component } from './r2d2.component';
import { TitleService } from '../services/title/title.service';

describe('R2d2Component', () => {
  let component: R2d2Component;
  let fixture: ComponentFixture<R2d2Component>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ R2d2Component ],
      providers: [
        { provide: TitleService, useValue: TitleServiceMock },
      ]
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

  it('should set title on init', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('R2-D2');
  });
});
