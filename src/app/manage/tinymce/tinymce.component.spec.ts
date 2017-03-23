/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChange} from '@angular/core';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { TinymceComponent } from './tinymce.component';
import * as tinymce from 'tinymce/tinymce';

describe('TinymceComponent', () => {
  let component: TinymceComponent;
  let fixture: ComponentFixture<TinymceComponent>;

  beforeEach(async(() => {
    spyOn(tinymce, 'init');
    spyOn(tinymce, 'remove');

    TestBed.configureTestingModule({
      declarations: [ TinymceComponent ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TinymceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should ngAfterViewInit', () => {
    component.elementId = 'stuff';
    component.ngAfterViewInit();
    expect(tinymce.init).toHaveBeenCalledWith({
      selector: '#' + component.elementId,
      skin_url: '/assets/lightgray',
      height: 500,
      plugins: component.plugins,
      toolbar1: component.toolbar1,
      toolbar2: component.toolbar2,
      image_advtab: true,
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ],
      content_css: [
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.97.8/css/materialize.min.css',
        '/tinymce.css'
      ],
      body_class: 'tiny-mce-container',
      setup: component.setupEditor,
    });
  });

  it('should setup editor', () => {
    const fakeEditor = jasmine.createSpyObj('tinymce', ['on']);
    spyOn(component.onEditorCreated, 'emit');
    component.setupEditor(fakeEditor);
    expect(component.onEditorCreated.emit).toHaveBeenCalled();
    expect(fakeEditor.on).toHaveBeenCalledWith('Dirty', component.handleSelectionChange);
    expect(fakeEditor.on).toHaveBeenCalledWith('keyup change blur', component.handleTextChange);
  });

  it('should set model touched when range is false', () => {
    spyOn(component, 'onModelTouched').and.callThrough();
    component.handleSelectionChange();
    expect(component.onModelTouched).toHaveBeenCalled();
  });

  describe('handleTextChange', () => {
    it('should set model changed and emit when html is default', () => {
      component.tinymceEditor = jasmine.createSpyObj('editor', ['getContent']);
      component.tinymceEditor.getContent.and.returnValue('stuff');
      spyOn(component.onContentChanged, 'emit');
      spyOn(component, 'onModelChange').and.callThrough();
      component.handleTextChange();
      expect(component.onModelChange).toHaveBeenCalledWith('stuff');
      expect(component.onContentChanged.emit).toHaveBeenCalledWith({
        editor: component.tinymceEditor,
        text: 'stuff'
      });
    });
  });

  describe('ngOnChanges', () => {
    it('should handle on changes when readonly', () => {
      const change = new SimpleChange('readOnly', 'readOnly');
      const attr = { setAttribute: jasmine.createSpy('setAttribute') };
      component.tinymceEditor = jasmine.createSpyObj('editor', ['getBody']);
      component.tinymceEditor.getBody.and.returnValue(attr);
      component.ngOnChanges({'readOnly': change});
      expect(attr.setAttribute).toHaveBeenCalledWith('contenteditable', false);
    });
    it('should handle on changes when not read only', () => {
      const change = new SimpleChange('things', 'things');
      const attr = { setAttribute: jasmine.createSpy('setAttribute') };
      component.tinymceEditor = jasmine.createSpyObj('editor', ['getBody']);
      component.tinymceEditor.getBody.and.returnValue(attr);
      component.ngOnChanges({'stuff': change});
      expect(component.tinymceEditor.getBody).not.toHaveBeenCalled();
      expect(attr.setAttribute).not.toHaveBeenCalled();
    });
  });

  describe('writeValue', () => {
    it('should write when current value exists and quill editor exists', () => {
      component.tinymceEditor = jasmine.createSpyObj('editor', ['setContent']);
      component.writeValue('stuff');
      expect(component.content).toBe('stuff');
      expect(component.tinymceEditor.setContent).toHaveBeenCalledWith('stuff');
    });
    it('should write when current value does not exist and quill editor exists', () => {
      component.tinymceEditor = jasmine.createSpyObj('editor', ['setContent']);
      component.writeValue(undefined);
      expect(component.content).toBeUndefined();
      expect(component.tinymceEditor.setContent).toHaveBeenCalledWith('');
    });
    it('should set content when quill editor does not exist', () => {
      component.writeValue('stuff');
      expect(component.content).toBe('stuff');
    });
  });

  it('should register on change', () => {
    const spy = jasmine.createSpy('testSpy');
    component.registerOnChange(spy);
    expect(component.onModelChange).toBe(spy);
  });

  it('should register on touched', () => {
    const spy = jasmine.createSpy('testSpy');
    component.registerOnTouched(spy);
    expect(component.onModelTouched).toBe(spy);
  });

  it('should destroy', () => {
    component.tinymceEditor = 'stuff';
    component.ngOnDestroy();
    expect(tinymce.remove).toHaveBeenCalledWith('stuff');
  });
});
