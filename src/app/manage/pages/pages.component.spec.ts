/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagesComponent } from './pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire } from 'angularfire2';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list')
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AngularFire, useValue: AngularFireMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(AngularFireMock.database.list).toHaveBeenCalledWith('/pages');
  });
});
