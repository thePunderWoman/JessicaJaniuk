import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { NotFoundComponent } from './notfound.component';
import { MetaService } from '../services/meta/meta.service';

describe('NotFoundComponent', () => {
  let component: NotFoundComponent;
  let fixture: ComponentFixture<NotFoundComponent>;
  const MetaServiceMock = {
    setTitle: jasmine.createSpy('setTitle'),
    setTag: jasmine.createSpy('setTag')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotFoundComponent ],
      providers: [
        { provide: MetaService, useValue: MetaServiceMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotFoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set title on init', () => {
    component.ngOnInit();
    expect(MetaServiceMock.setTitle).toHaveBeenCalledWith('404! Not Found');
  });
});
