/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { PageService } from '../../services/page/page.service';
import { AuthService } from '../../services/auth/auth.service';

import { PagesComponent } from './pages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule } from '@angular/material/icon';
import { MdDialogModule } from '@angular/material/dialog';
import { Page } from '../../models/page';

describe('PagesComponent', () => {
  let component: PagesComponent;
  let fixture: ComponentFixture<PagesComponent>;
  const pageServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    remove: jasmine.createSpy('remove')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  pageServiceMock.getAll.and.returnValue(fakeSubscribe);
  pageServiceMock.remove.and.returnValue(fakeSubscribe);
  const authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagesComponent ],
      imports: [
        RouterTestingModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: PageService, useValue: pageServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeSubscribe.subscribe.calls.reset();
    pageServiceMock.getAll.calls.reset();
    pageServiceMock.remove.calls.reset();
    authServiceMock.logout.calls.reset();
    fixture = TestBed.createComponent(PagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(pageServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePages, component.handleError);
  });

  it('should populate pages', () => {
    const pages = { data: [{ id: 5, title: 'stuff', 'key': 'things'}, { id: 3, title: 'fake', 'key': 'item'}] };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(pages);
    component.populatePages(data);
    expect(component.pages.length).toBe(2);
  });

  describe('handleError', () => {
    it('should log out and redirect on 401', () => {
      const err = { status: 401 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).toHaveBeenCalled();
      expect(component.router.navigate).toHaveBeenCalledWith(['/auth']);
    });
    it('should not log out or redirect on any other error', () => {
      const err = { status: 500 };
      spyOn(component.router, 'navigate');
      component.handleError(err);
      expect(authServiceMock.logout).not.toHaveBeenCalled();
      expect(component.router.navigate).not.toHaveBeenCalled();
    });
  });

  it('should confirm delete', () => {
    const refFake = jasmine.createSpyObj('mdDialogRef', ['afterClosed']);
    refFake.afterClosed.and.returnValue(fakeSubscribe);
    spyOn(component.dialog, 'open').and.returnValue(refFake);
    component.confirmDelete('testkey');
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deletePage);
  });

  describe('deletePage', () => {
    it('should delete page when confirmed', () => {
      component.key = 5;
      component.deletePage(true);
      expect(pageServiceMock.remove).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleDelete);
    });

    it('should not delete page when canceled', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.key = 5;
      component.deletePage(undefined);
      expect(pageServiceMock.remove).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  it('should handle delete', () => {
    component.key = 5;
    const page1 = new Page('test', 'testerson', 'key');
    page1.id = 5;
    const page2 = new Page('name', 'last', 'key2');
    page2.id = 2;
    component.pages.push(page1);
    component.pages.push(page2);
    component.handleDelete();
    expect(component.pages.length).toBe(1);
  });
});
