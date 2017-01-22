/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PageService } from '../../services/page/page.service';
import { Page } from '../../models/page';

import { PageFormComponent } from './page-form.component';
import { MdInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 5
      }
    }
  };
  let pageServiceMock = {
    getById: jasmine.createSpy('getById'),
    update: jasmine.createSpy('update'),
    save: jasmine.createSpy('save'),
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  pageServiceMock.getById.and.returnValue(fakeSubscribe);
  pageServiceMock.update.and.returnValue(fakeSubscribe);
  pageServiceMock.save.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    pageServiceMock.getById.calls.reset();
    pageServiceMock.update.calls.reset();
    pageServiceMock.save.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    TestBed.configureTestingModule({
      declarations: [ PageFormComponent ],
      imports: [
        FormsModule,
        MdInputModule.forRoot()
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: PageService, useValue: pageServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getPage');
    component.ngOnInit();
    expect(component.getPage).toHaveBeenCalled();
  });

  describe('getPage', () => {
    it('should get page when an id exists', () => {
      component.id = 5;
      component.getPage();
      expect(pageServiceMock.getById).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePage);
    });

    it('should not get page when no id exists', () => {
      pageServiceMock.getById.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.id = undefined;
      component.getPage();
      expect(pageServiceMock.getById).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populatePage);
    });
  });

  describe('populatePage', () => {
    it('should set user if data is present', () => {
      let data = { json: jasmine.createSpy('json') };
      let response = { data: { id: 4, title: 'test' } };
      data.json.and.returnValue(response);
      component.populatePage(data);
      expect(component.page.id).toBe(4);
      expect(component.page.title).toBe('test');
    });
    it('should not set user if data is not present', () => {
      let data = { json: jasmine.createSpy('json') };
      let response = { data: undefined };
      data.json.and.returnValue(response);
      component.populatePage(data);
      expect(component.page.id).toBeUndefined();
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 5;
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  describe('onSubmit', () => {
    it('should save new page when no id', () => {
      let page = new Page('test', '', '');
      component.id = undefined;
      component.page = page;
      component.onSubmit();
      expect(pageServiceMock.save).toHaveBeenCalledWith(component.page);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should update existing user when id exists', () => {
      let page = new Page('test', '', '');
      component.id = 5;
      component.page = page;
      component.onSubmit();
      expect(pageServiceMock.update).toHaveBeenCalledWith(5, component.page);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
  });

  it('should set id result on save', () => {
    let data = { json: jasmine.createSpy('json') };
    let response = { data: { id: 6 } };
    data.json.and.returnValue(response);
    component.saving = true;
    component.id = undefined;
    component.saveComplete(data);
    expect(component.saving).toBeFalsy();
    expect(component.id).toBe(6);
  });
});
