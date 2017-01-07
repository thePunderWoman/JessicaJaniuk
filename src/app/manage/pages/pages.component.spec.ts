/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PagesComponent } from './pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire } from 'angularfire2';
import { MdIconModule } from '@angular/material/icon';
import { MdDialogModule } from '@angular/material/dialog';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list'),
      object: jasmine.createSpy('object')
    }
  };

  let fakePage = jasmine.createSpyObj('page', ['remove']);
  AngularFireMock.database.object.and.returnValue(fakePage);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      imports: [
        RouterTestingModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
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

  it('should confirm delete', () => {
    let fakeSubscribe = { subscribe: jasmine.createSpy('subscribe') };
    let refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
    refFake.afterClosed.and.returnValue(fakeSubscribe);
    spyOn(component.dialog, 'open').and.returnValue(refFake);
    component.confirmDelete('testkey');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deletePage);
  });

  describe('deletePage', () => {
    it('should delete post when confirmed', () => {
      component.key = 'testkey';
      component.deletePage(true);
      expect(AngularFireMock.database.object).toHaveBeenCalledWith('/pages/testkey');
      expect(fakePage.remove).toHaveBeenCalled();
      expect(component.key).toBeUndefined();
    });

    it('should delete post when canceled', () => {
      fakePage.remove.calls.reset();
      component.key = 'testkey';
      component.deletePage(undefined);
      expect(fakePage.remove).not.toHaveBeenCalled();
      expect(component.key).toBeUndefined();
    });
  });
});
