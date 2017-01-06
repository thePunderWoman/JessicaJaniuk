/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Page } from '../../models/page';

import { PageFormComponent } from './page-form.component';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { MdInputModule } from '@angular/material/input';
import { ActivatedRoute } from '@angular/router';

describe('PageFormComponent', () => {
  let component: PageFormComponent;
  let fixture: ComponentFixture<PageFormComponent>;
  let activatedRouteMock = {
    snapshot: {
      params: {
        'id': 'things'
      }
    }
  };
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list'),
      object: jasmine.createSpy('object')
    }
  };
  let fakeSubscribe = {
    subscribe: jasmine.createSpy('subscribe')
  };
  let fakeArray = {
    push: jasmine.createSpy('push')
  };
  let fakeThenable = {
    then: jasmine.createSpy('then')
  };
  fakeArray.push.and.returnValue(fakeThenable);
  AngularFireMock.database.object.and.returnValue(fakeSubscribe);
  AngularFireMock.database.list.and.returnValue(fakeArray);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageFormComponent ],
      imports: [
        FormsModule,
        MdInputModule.forRoot()
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AngularFire, useValue: AngularFireMock }
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
      component.id = 'things';
      component.getPage();
      expect(AngularFireMock.database.object).toHaveBeenCalledWith('/pages/things');
      expect(fakeSubscribe.subscribe).toHaveBeenCalledWith(component.populatePage);
    });

    it('should not get page when no id exists', () => {
      component.id = undefined;
      AngularFireMock.database.object.calls.reset();
      fakeSubscribe.subscribe.calls.reset();
      component.getPage();
      expect(AngularFireMock.database.object).not.toHaveBeenCalledWith('/pages/things');
      expect(fakeSubscribe.subscribe).not.toHaveBeenCalledWith(component.populatePage);
    });
  });

  describe('addOrEdit', () => {
    it('should be add if id is undefined', () => {
      component.id = undefined;
      expect(component.addOrEdit()).toBe('Add');
    });
    it('should be edit if id is defined', () => {
      component.id = 'stuff';
      expect(component.addOrEdit()).toBe('Edit');
    });
  });

  it('should populate page', () => {
    let fakePage = {
      Title: 'test',
      Content: '<p>Cheese</p>',
    };
    component.populatePage(fakePage);
    expect(component.page.Title).toBe(fakePage.Title);
    expect(component.page.Content).toBe(fakePage.Content);
  });

  describe('onSubmit', () => {
    it('should submit when id exists', () => {
      component.page = new Page();
      component.fbPage = new FirebaseObjectObservable<Page>();
      spyOn(component.fbPage, 'set');
      component.id = 'test';
      component.onSubmit();
      expect(component.fbPage.set).toHaveBeenCalledWith(component.page);
    });
    it('should submit when no id exists', () => {
      component.page = new Page();
      component.id = undefined;
      component.onSubmit();
      expect(AngularFireMock.database.list).toHaveBeenCalledWith('/pages');
      expect(fakeArray.push).toHaveBeenCalledWith(component.page);
      expect(fakeThenable.then).toHaveBeenCalledWith(component.setId);
    });
  });

  it('should set id', () => {
    component.setId({ key: '5' });
    expect(component.id).toBe('5');
  });
});
