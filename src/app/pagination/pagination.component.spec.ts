/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';

import { RouterTestingModule } from '@angular/router/testing';
import { PaginationComponent } from './pagination.component';
import { Router } from '@angular/router';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  const routerStub = {
    navigate: jasmine.createSpy('navigate')
  };
  const fakeRoute = '/test/url';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationComponent ],
      imports: [
        RouterTestingModule.withRoutes([])
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should handle input changes to page', () => {
    component.page = 1;
    const change = new SimpleChange(1, 2, false);
    component.ngOnChanges({'page': change});
    expect(component.page).toBe(2);
  });

  it('should handle input changes to pages', () => {
    component.pages = 1;
    const change = new SimpleChange(1, 4, false);
    component.ngOnChanges({'pages': change});
    expect(component.pages).toBe(4);
  });

  it('should set page numbers', () => {
    component.pages = 3;
    component.setPageNumbers();
    expect(component.pageNumbers.length).toBe(3);
    expect(component.pageNumbers[0]).toBe(1);
    expect(component.pageNumbers[1]).toBe(2);
    expect(component.pageNumbers[2]).toBe(3);
  });

  it('should go to previous page', () => {
    component.page = 2;
    component.route = '/test/url/';
    spyOn(component.router, 'navigate');
    component.prevPage();
    expect(component.page).toBe(1);
    expect(component.router.navigate).toHaveBeenCalledWith(['/test/url/1']);
  });

  it('should go to next page', () => {
    component.pages = 3;
    component.page = 2;
    component.route = '/test/url/';
    spyOn(component.router, 'navigate');
    component.nextPage();
    expect(component.page).toBe(3);
    expect(component.router.navigate).toHaveBeenCalledWith(['/test/url/3']);
  });
});
