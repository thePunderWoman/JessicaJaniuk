import {
  Component,
  OnDestroy,
  AfterViewInit,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

@Component({
  selector: 'app-simple-tiny',
  template: `<textarea id="{{elementId}}"></textarea>`
})
/* istanbul ignore next */
export class SimpleTinyComponent implements AfterViewInit, OnDestroy {
  @Input() elementId: String;
  /* istanbul ignore next */
  @Output() onEditorKeyup = new EventEmitter<any>();

  editor;

  /* istanbul ignore next */
  ngAfterViewInit() {
    tinymce.init({
      selector: '#' + this.elementId,
      plugins: ['link', 'paste', 'table'],
      menubar: false,
      height: 400,
      skin_url: '/assets/lightgray',
      setup: editor => {
        this.editor = editor;
        editor.on('keyup', () => {
          const content = editor.getContent();
          this.onEditorKeyup.emit(content);
        });
      },
    });
  }

  /* istanbul ignore next */
  ngOnDestroy() {
    tinymce.remove(this.editor);
  }
}
