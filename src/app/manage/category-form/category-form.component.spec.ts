/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/category/category.service';
import { Category } from '../../models/category';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryFormComponent } from './category-form.component';
import { MdInputModule } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

describe('CategoryFormComponent', () => {
  let component: CategoryFormComponent;
  let fixture: ComponentFixture<CategoryFormComponent>;
  const activatedRouteMock = {
    snapshot: {
      params: {
        'id': 5
      }
    }
  };
  const categoryServiceMock = {
    getById: jasmine.createSpy('getById'),
    update: jasmine.createSpy('update'),
    save: jasmine.createSpy('save'),
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  categoryServiceMock.getById.and.returnValue(fakeSubscribe);
  categoryServiceMock.update.and.returnValue(fakeSubscribe);
  categoryServiceMock.save.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    categoryServiceMock.getById.calls.reset();
    categoryServiceMock.update.calls.reset();
    categoryServiceMock.save.calls.reset();
    fakeSubscribe.subscribe.calls.reset();
    TestBed.configureTestingModule({
      declarations: [ CategoryFormComponent ],
      imports: [
        FormsModule,
        BrowserAnimationsModule,
        MdInputModule
      ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: CategoryService, useValue: categoryServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    spyOn(component, 'getCategory');
    component.ngOnInit();
    expect(component.getCategory).toHaveBeenCalled();
  });

  describe('getCategory', () => {
    it('should get page when an id exists', () => {
      component.id = 5;
      component.getCategory();
      expect(categoryServiceMock.getById).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateCategory);
    });

    it('should not get page when no id exists', () => {
      categoryServiceMock.getById.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.id = undefined;
      component.getCategory();
      expect(categoryServiceMock.getById).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populateCategory);
    });
  });

  describe('populateCategory', () => {
    it('should set category if data is present', () => {
      const data = { json: jasmine.createSpy('json') };
      const response = { data: { id: 4, name: 'test' } };
      data.json.and.returnValue(response);
      component.populateCategory(data);
      expect(component.category.id).toBe(4);
      expect(component.category.name).toBe('test');
    });
    it('should not set category if data is not present', () => {
      const data = { json: jasmine.createSpy('json') };
      const response = { data: undefined };
      data.json.and.returnValue(response);
      component.populateCategory(data);
      expect(component.category.id).toBeUndefined();
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
      const category = new Category('test', 5);
      component.id = undefined;
      component.category = category;
      component.onSubmit();
      expect(categoryServiceMock.save).toHaveBeenCalledWith(component.category);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
    it('should update existing user when id exists', () => {
      const category = new Category('test', 5);
      component.id = 5;
      component.category = category;
      component.onSubmit();
      expect(categoryServiceMock.update).toHaveBeenCalledWith(5, component.category);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.saveComplete);
    });
  });

  it('should set id result on save', () => {
    const data = { json: jasmine.createSpy('json') };
    const response = { data: { id: 6 } };
    data.json.and.returnValue(response);
    component.saving = true;
    component.id = undefined;
    component.saveComplete(data);
    expect(component.saving).toBeFalsy();
    expect(component.id).toBe(6);
  });
});
