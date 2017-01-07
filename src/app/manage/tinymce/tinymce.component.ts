import {
  AfterViewInit,
  OnDestroy,
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor
} from '@angular/forms';

declare let tinymce: any;
declare var window: any;

@Component({
  selector: 'app-tinymce',
  template: '<textarea id="{{elementId}}"></textarea>',
  styleUrls: ['./tinymce.component.scss'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TinymceComponent),
    multi: true
  }],
  encapsulation: ViewEncapsulation.None
})
export class TinymceComponent implements AfterViewInit, ControlValueAccessor, OnChanges, OnDestroy {

  tinymceEditor: any;
  editorElem: HTMLElement;
  content: any;
  plugins: string[] = ['advlist autolink lists link image charmap print preview hr anchor pagebreak',
    'searchreplace wordcount visualblocks visualchars code fullscreen',
    'insertdatetime media nonbreaking save table contextmenu directionality',
    'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc'
  ];
  toolbar1: string = 'undo redo | insert | styleselect | bold italic |'
        + ' alignleft aligncenter alignright alignjustify | bullist numlist outdent indent';
  toolbar2: string = 'link image media | forecolor backcolor emoticons | codesample';

  @Input() theme: string;
  @Input() modules: Object;
  @Input() readOnly: boolean;
  @Input() placeholder: string;
  @Input() formats: string[];
  @Input() elementId: String;

  @Output() onEditorCreated: EventEmitter<any> = new EventEmitter();
  @Output() onContentChanged: EventEmitter<any> = new EventEmitter();

  onModelChange: Function = () => {};
  onModelTouched: Function = () => {};


  constructor(private elementRef: ElementRef) {
    this.handleSelectionChange = this.handleSelectionChange.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.setupEditor = this.setupEditor.bind(this);
  }

  ngAfterViewInit() {
    window.tinymce.init({
      selector: '#' + this.elementId,
      skin_url: '/assets/lightgray',
      height: 500,
      plugins: this.plugins,
      toolbar1: this.toolbar1,
      toolbar2: this.toolbar2,
      image_advtab: true,
      templates: [
        { title: 'Test template 1', content: 'Test 1' },
        { title: 'Test template 2', content: 'Test 2' }
      ],
      setup: this.setupEditor,
    });
  }

  setupEditor(editor) {
    this.tinymceEditor = editor;

    this.onEditorCreated.emit(this.tinymceEditor);

    this.tinymceEditor.on('Dirty', this.handleSelectionChange);

    // update model if text changes
    this.tinymceEditor.on('keyup change blur', this.handleTextChange);

  }

  handleSelectionChange() {
    this.onModelTouched();
  }

  handleTextChange() {
    const text = this.tinymceEditor.getContent();
    this.onModelChange(text);
    this.onContentChanged.emit({
      editor: this.tinymceEditor,
      text: text
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['readOnly'] && this.tinymceEditor) {
      this.tinymceEditor.getBody().setAttribute('contenteditable', !changes['readOnly'].currentValue);
    }
  }

  writeValue(currentValue: any) {
    this.content = currentValue;

    /* istanbul ignore else  */
    if (this.tinymceEditor) {
      if (currentValue) {
        this.tinymceEditor.setContent(currentValue);
        return;
      }
      this.tinymceEditor.setContent('');
    }
  }

  registerOnChange(fn: Function): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.onModelTouched = fn;
  }

  ngOnDestroy(): void {
    window.tinymce.remove(this.tinymceEditor);
  }
}
