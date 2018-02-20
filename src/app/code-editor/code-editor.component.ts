import {
  Component,
  ElementRef,
  EventEmitter,
  forwardRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import {
  Feedback,
  FeedbackFactory,
  FeedbackType,
  SourceType,
  ProgrammingLanguage
} from '../common/model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MonacoLoaderService } from './monaco-loader.service';
import { CodeExecutorService } from './validation';
import { EditorModelEntities, ChangeModelValueAction } from './store';
import { Store } from '@ngrx/store';

/**
 * Monaco editor as a custom form control
 */
@Component({
  selector: 'app-code-editor',
  templateUrl: './code-editor.component.html',
  styleUrls: ['./code-editor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CodeEditorComponent),
      multi: true
    }
  ]
})
export class CodeEditorComponent
  implements OnInit, OnDestroy, ControlValueAccessor {
  constructor(
    private monaco: MonacoLoaderService,
    private executor: CodeExecutorService,
    private store: Store<EditorModelEntities>
  ) {}

  @ViewChild('editor') editorContent: ElementRef;

  @Output() errorMarkerChanges = new EventEmitter<Feedback[]>();

  editor: monaco.editor.IStandaloneCodeEditor;

  uri: monaco.Uri;

  initialized: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  height = 100;

  private _language: ProgrammingLanguage;

  // tslint:disable-next-line:no-empty
  onChange: (_: string) => void = () => {};
  // tslint:disable-next-line:no-empty
  onTouched: () => void = () => {};

  ngOnInit(): void {
    if (!this.editor && this.monaco.isMonacoLoaded.getValue()) {
      this.initEditor();
    }
    this.monaco.isMonacoLoaded.subscribe(loaded => {
      if (loaded && !this.editor) {
        this.initEditor();
      }
    });
  }

  @Input()
  set language(language: ProgrammingLanguage) {
    this._language = language;
    if (language) {
      this.executeAfterInitialized(() => {
        monaco.editor.setModelLanguage(
          this.editor.getModel(),
          language.toString()
        );
      });
    }
  }

  get language(): ProgrammingLanguage {
    return this._language;
  }

  initEditor() {
    const editorDiv: HTMLDivElement = this.editorContent.nativeElement;

    this.editor = monaco.editor.create(editorDiv, {
      language: ProgrammingLanguage.javascript.toString(),
      theme: 'vs-dark'
    });

    this.editor.getModel().onDidChangeContent(e => {
      const model = this.editor.getModel();

      this.store.dispatch(
        new ChangeModelValueAction({
          id: model.id,
          versionId: model.getVersionId(),
          value: model.getValue()
        })
      );

      this.onChange(model.getValue());
      this.height = this.computeHeight();
    });

    this.editor.onKeyUp(e => {
      this.onTouched();
    });

    this.height = this.computeHeight();

    this.editor.layout();

    this.uri = this.getCurrentModelUri();

    // select current validation errors
    //this.editor.getModel().id

    this.editor.getModel().onDidChangeDecorations(e => {
      const decorations = this.editor.getModel().getAllDecorations();
      if (decorations.length === 0) {
        const source = this.editor.getModel().getValue();
        const res = this.executor.run(source, this.language);

        if (res.type === FeedbackType.Error) {
          const marker = this.createMarkerData(res);
          monaco.editor.setModelMarkers(this.editor.getModel(), 'eval', [
            marker
          ]);
        } else {
          this.errorMarkerChanges.emit([
            FeedbackFactory.createSuccess(
              SourceType.Monaco,
              this.editor.getModel().getValue()
            )
          ]);
        }

        /// XXX ???
        this.editor.layout();
      }
      this.emitErrorChanges(this.uri);
    });

    this.initialized.next(true);
  }

  private createMarkerData(f: Feedback): monaco.editor.IMarkerData {
    return {
      severity: monaco.Severity.Error,
      message: f.message,
      startLineNumber: 1,
      startColumn: 1,
      endLineNumber: 1,
      endColumn: 1
    };
  }

  ngAfterViewChecked(): void {
    if (this.editor) {
      this.editor.layout();
    }
  }

  emitErrorChanges(url: monaco.Uri) {
    const errorMarkers = monaco.editor
      .getModelMarkers({ resource: url })
      .filter(m => m.severity === monaco.Severity.Error)
      .map(m => {
        return {
          message: m.message,
          type: FeedbackType.Error,
          source: SourceType.Monaco,
          value: '',
          startLineNumber: m.startLineNumber
        };
      })
      .sort(
        (a: Feedback, b: Feedback) => a.startLineNumber - b.startLineNumber
      );

    // filter equal lines
    const filteredMarkers = [];
    let j = -1;
    for (const e of errorMarkers) {
      if (e.startLineNumber !== j) {
        filteredMarkers.push(e);
      }
      j = e.startLineNumber;
    }
    this.errorMarkerChanges.emit(filteredMarkers);
  }

  private getCurrentModelUri(): monaco.Uri {
    const pathId = this.getCurrentModelPath();
    return new monaco.Uri()
      .with({ scheme: 'inmemory' })
      .with({ authority: 'model' })
      .with({ path: '/' + pathId });
  }

  private getCurrentModelPath(): string {
    const id = this.editor.getModel().id;
    return id.split('$model')[1];
  }

  /**
   * Upon destruction of the component we make sure to dispose both the editor and the extra libs that we might've loaded
   */
  ngOnDestroy() {
    this.editor.dispose();
  }

  /**
   * WriteValue
   * Implements ControlValueAccessor
   *
   * @param value
   */
  writeValue(value: string) {
    this.executeAfterInitialized(() => {
      const model = this.editor.getModel();
      model.setValue(value || '');
      this.editor.layout();
    });
  }

  private executeAfterInitialized(fn: () => void): void {
    if (this.initialized.getValue()) {
      fn();
    } else {
      this.initialized.subscribe(v => {
        if (v) {
          fn();
        }
      });
    }
  }

  registerOnChange(fn: (_: string) => void) {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void) {
    this.onTouched = fn;
  }

  private computeHeight(): number {
    const configuration = this.editor.getConfiguration();

    const lineHeight = configuration.lineHeight;
    const lineCount = this.editor.getModel().getLineCount();
    const contentHeight = lineHeight * lineCount;

    const horizontalScrollbarHeight =
      configuration.layoutInfo.horizontalScrollbarHeight;

    const editorHeight = contentHeight + horizontalScrollbarHeight;
    const defaultHeight = lineHeight + horizontalScrollbarHeight;
    return Math.max(defaultHeight, editorHeight);
  }

  @HostListener('window:resize')
  onResize() {
    this.editor.layout();
  }
}
