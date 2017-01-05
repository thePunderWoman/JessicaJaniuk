/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange } from '@angular/core';

import { QuillEditorComponent } from './quill-editor.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuillEditorComponent', () => {
  let component: QuillEditorComponent;
  let fixture: ComponentFixture<QuillEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuillEditorComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuillEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngAfterViewInit', () => {
    component.content = 'stuff goes here';
    spyOn(component.onEditorCreated, 'emit');
    component.ngAfterViewInit();
    expect(component.onEditorCreated.emit).toHaveBeenCalled();
  });

  describe('handleSelectionChange', () => {
    it('should set model touched when range is false', () => {
      spyOn(component, 'onModelTouched').and.callThrough();
      component.handleSelectionChange(false);
      expect(component.onModelTouched).toHaveBeenCalled();
    });
    it('should not set model touched when range is true', () => {
      spyOn(component, 'onModelTouched').and.callThrough();
      component.handleSelectionChange(true);
      expect(component.onModelTouched).not.toHaveBeenCalled();
    });
  });

  describe('handleTextChange', () => {
    it('should set model changed and emit when html is not default', () => {
      component.quillEditor = jasmine.createSpyObj('quillEditor', ['getText']);
      component.quillEditor.getText.and.returnValue('stuff');
      spyOn(component.onContentChanged, 'emit');
      spyOn(component, 'onModelChange');
      let testElem = document.createElement('div');
      let testChild = document.createElement('div');
      let testP = document.createElement('p');
      testP.innerText = 'things';
      testChild.appendChild(testP);
      testElem.appendChild(testChild);
      component.editorElem = testElem;
      component.handleTextChange('', '', '');
      expect(component.onModelChange).toHaveBeenCalledWith('<p>things</p>');
      expect(component.onContentChanged.emit).toHaveBeenCalledWith({
        editor: component.quillEditor,
        html: '<p>things</p>',
        text: 'stuff'
      });
    });
    it('should set model changed and emit when html is default', () => {
      component.quillEditor = jasmine.createSpyObj('quillEditor', ['getText']);
      component.quillEditor.getText.and.returnValue('stuff');
      spyOn(component.onContentChanged, 'emit');
      spyOn(component, 'onModelChange');
      let testElem = document.createElement('div');
      let testChild = document.createElement('div');
      let testP = document.createElement('p');
      testP.appendChild(document.createElement('br'));
      testChild.appendChild(testP);
      testElem.appendChild(testChild);
      component.editorElem = testElem;
      component.handleTextChange('', '', '');
      expect(component.onModelChange).toHaveBeenCalledWith(null);
      expect(component.onContentChanged.emit).toHaveBeenCalledWith({
        editor: component.quillEditor,
        html: null,
        text: 'stuff'
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should handle on changes when readonly', () => {
      let change = new SimpleChange('readOnly', 'readOnly');
      component.quillEditor = jasmine.createSpyObj('editor', ['enable']);
      component.ngOnChanges({'readOnly': change});
      expect(component.quillEditor.enable).toHaveBeenCalledWith(false);
    });
    it('should handle on changes when not read only', () => {
      let change = new SimpleChange('things', 'things');
      component.quillEditor = jasmine.createSpyObj('editor', ['enable']);
      component.ngOnChanges({'stuff': change});
      expect(component.quillEditor.enable).not.toHaveBeenCalled();
    });
  });

  describe('writeValue', () => {
    it('should write when current value exists and quill editor exists', () => {
      component.quillEditor = jasmine.createSpyObj('editor', ['pasteHTML', 'setText']);
      component.writeValue('stuff');
      expect(component.content).toBe('stuff');
      expect(component.quillEditor.pasteHTML).toHaveBeenCalledWith('stuff');
      expect(component.quillEditor.setText).not.toHaveBeenCalled();
    });
    it('should write when current value does not exist and quill editor exists', () => {
      component.quillEditor = jasmine.createSpyObj('editor', ['pasteHTML', 'setText']);
      component.writeValue(undefined);
      expect(component.content).toBeUndefined();
      expect(component.quillEditor.pasteHTML).not.toHaveBeenCalled();
      expect(component.quillEditor.setText).toHaveBeenCalledWith('');
    });
    it('should set content when quill editor does not exist', () => {
      component.writeValue('stuff');
      expect(component.content).toBe('stuff');
    });
  });

  it('should register on change', () => {
    let spy = jasmine.createSpy('testSpy');
    component.registerOnChange(spy);
    expect(component.onModelChange).toBe(spy);
  });

  it('should register on touched', () => {
    let spy = jasmine.createSpy('testSpy');
    component.registerOnTouched(spy);
    expect(component.onModelTouched).toBe(spy);
  });
});
