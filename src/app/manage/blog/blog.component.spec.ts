/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { BlogComponent } from './blog.component';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFire } from 'angularfire2';
import { MomentModule } from 'angular2-moment';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  let AngularFireMock = {
    database: {
      list: jasmine.createSpy('list')
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogComponent ],
      imports: [ RouterTestingModule, MomentModule ],
      providers: [
        { provide: AngularFire, useValue: AngularFireMock}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngOnInit', () => {
    component.ngOnInit();
    expect(AngularFireMock.database.list).toHaveBeenCalledWith('/blog/post');
  });
});
