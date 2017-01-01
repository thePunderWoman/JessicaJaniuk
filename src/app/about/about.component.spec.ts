/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AboutComponent } from './about.component';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { TitleService } from '../services/title/title.service';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;
  let TitleServiceMock = {
    setTitle: jasmine.createSpy('setTitle')
  };
  let fbObject = { subscribe: jasmine.createSpy('subscribe') };

  beforeEach(async(() => {

    let AngularFireStub = {
      database: {
        object: () => fbObject
      }
    };

    TestBed.configureTestingModule({
      declarations: [ AboutComponent ],
      providers: [
        { provide: AngularFire, useValue: AngularFireStub },
        { provide: TitleService, useValue: TitleServiceMock },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.page).toBe(fbObject);
    expect(fbObject.subscribe).toHaveBeenCalledWith(component.handlePage);
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(TitleServiceMock.setTitle).toHaveBeenCalledWith('About Me');
  });

  it('should handle page data', () => {
    let pageData = { $value: 'content' };
    component.handlePage(pageData);
    expect(component.body).toBe('content');
    expect(component.show).toBeTruthy();
  });
});
