import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { MdDialogModule, MdDialogRef } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { DeleteDialogComponent } from './delete-dialog.component';

describe('DeleteDialogComponent', () => {
  let component: DeleteDialogComponent;
  let fixture: ComponentFixture<DeleteDialogComponent>;
  const mockMdDialogRef = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteDialogComponent ],
      imports: [
        BrowserAnimationsModule,
        MdDialogModule
      ],
      providers: [
        { provide: MdDialogRef, useValue: mockMdDialogRef }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
