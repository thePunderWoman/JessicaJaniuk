import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import 'hammerjs';

import { PublicComponent } from './public.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NavigationComponent } from '../navigation/navigation.component';
import { MaterialModule } from '@angular/material';

describe('PublicComponent', () => {
  let component: PublicComponent;
  let fixture: ComponentFixture<PublicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicComponent, NavigationComponent ],
      imports: [
        RouterTestingModule,
        MaterialModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
