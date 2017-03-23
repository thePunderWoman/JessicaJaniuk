/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MdIconModule } from '@angular/material/icon';
import { MdDialogModule } from '@angular/material/dialog';
import { CategoryService } from '../../services/category/category.service';
import { AuthService } from '../../services/auth/auth.service';
import { Category } from '../../models/category';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const categoryServiceMock = {
    getAll: jasmine.createSpy('getAll'),
    remove: jasmine.createSpy('remove')
  };
  const fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  categoryServiceMock.getAll.and.returnValue(fakeSubscribe);
  categoryServiceMock.remove.and.returnValue(fakeSubscribe);
  const authServiceMock = {
    logout: jasmine.createSpy('logout')
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
        RouterTestingModule,
        MdIconModule.forRoot(),
        MdDialogModule.forRoot()
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: CategoryService, useValue: categoryServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fakeSubscribe.subscribe.calls.reset();
    categoryServiceMock.getAll.calls.reset();
    categoryServiceMock.remove.calls.reset();
    authServiceMock.logout.calls.reset();
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init', () => {
    component.ngOnInit();
    expect(categoryServiceMock.getAll).toHaveBeenCalled();
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populateCategories, component.handleError);
  });

  it('should populate categorys', () => {
    const categorys = { data: [{ id: 1, name: 'fb'}, { id: 2, name: 'tw'}] };
    const data = { json: jasmine.createSpy('json') };
    data.json.and.returnValue(categorys);
    component.populateCategories(data);
    expect(component.categories.length).toBe(2);
  });

  it('should determine if has posts', () => {
    expect(component.hasPosts('1')).toBeTruthy();
    expect(component.hasPosts('0')).toBeFalsy();
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
    expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.deleteCategory);
  });

  describe('deleteCategories', () => {
    it('should delete category when confirmed', () => {
      component.key = 5;
      component.deleteCategory(true);
      expect(categoryServiceMock.remove).toHaveBeenCalledWith(5);
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.handleDelete);
    });

    it('should not delete category when canceled', () => {
      fakeSubscribe.subscribe.calls.reset();
      component.key = 5;
      component.deleteCategory(undefined);
      expect(categoryServiceMock.remove).not.toHaveBeenCalled();
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalled();
    });
  });

  it('should handle delete', () => {
    component.key = 5;
    const conn1 = new Category('test', 5);
    conn1.id = 5;
    const conn2 = new Category('name', 1);
    conn2.id = 2;
    component.categories.push(conn1);
    component.categories.push(conn2);
    component.handleDelete();
    expect(component.categories.length).toBe(1);
  });
});
