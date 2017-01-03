/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { PostFormComponent } from './post-form.component';
import { AngularFire } from 'angularfire2';
import { ActivatedRoute } from '@angular/router';
import { MdInputModule } from '@angular/material/input';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

fdescribe('PostFormComponent', () => {
  let component: PostFormComponent;
  let fixture: ComponentFixture<PostFormComponent>;
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
  AngularFireMock.database.object.and.returnValue(fakeSubscribe);
  AngularFireMock.database.list.and.returnValue(fakeSubscribe);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostFormComponent ],
      imports: [
        FormsModule,
        MdInputModule.forRoot(),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteMock },
        { provide: AngularFire, useValue: AngularFireMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
