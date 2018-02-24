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
import {
  EditorModelEntities,
  ChangeModelValueAction,
  getValidationResult
} from './store';
import { Store } from '@ngrx/store';
import {
  createMarkerData,
  getRelevantMarkers,
  createFeedback
} from './marker-data-util';
import { Subscription } from 'rxjs';

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
  private subs: Subscription[] = [];

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

  get model() {
    if (this.editor) {
      return this.editor.getModel();
    }
    return null;
  }

  get value() {
    if (this.model) {
      return this.model.getValue();
    }
    return null;
  }

  @Input()
  set language(language: ProgrammingLanguage) {
    this._language = language;
    if (language) {
      this.executeAfterInitialized(() => {
        monaco.editor.setModelLanguage(this.model, language.toString());
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

    this.model.onDidChangeContent(e => {
      this.store.dispatch(
        new ChangeModelValueAction({
          id: this.model.id,
          versionId: this.model.getVersionId(),
          value: this.value
        })
      );

      this.onChange(this.value);
      this.height = this.computeHeight();
    });

    this.editor.onKeyUp(e => {
      this.onTouched();
    });

    this.height = this.computeHeight();

    this.editor.layout();

    this.uri = this.getCurrentModelUri();

    // select current validation errors
    const validationErrors = this.store.select(
      getValidationResult(this.model.id)
    );

    this.subs.push(
      validationErrors.subscribe(e => {
        if (e) {
          console.log(e);
          //overwrite the error markers, if it is the same version
          const marker = createMarkerData(e);
          monaco.editor.setModelMarkers(this.model, 'validation', [marker]);
        }
      })
    );

    this.model.onDidChangeDecorations(e => {
      const decorations = this.model.getAllDecorations();
      if (decorations.length === 0) {
        const res = this.executor.run(this.value, this.language);

        if (res.type === FeedbackType.Error) {
          const marker = createMarkerData(res);
          monaco.editor.setModelMarkers(this.model, 'eval', [marker]);
        } else {
          this.errorMarkerChanges.emit([
            FeedbackFactory.createSuccess(SourceType.Monaco, this.value)
          ]);
        }

        /// XXX ???
        this.editor.layout();
      }
      this.emitErrorChanges(this.uri);
    });

    this.initialized.next(true);
  }

  ngAfterViewChecked(): void {
    if (this.editor) {
      this.editor.layout();
    }
  }

  emitErrorChanges(url: monaco.Uri) {
    const errorMarkers = getRelevantMarkers(
      monaco.editor.getModelMarkers({ resource: url })
    );

    const feedbacks = errorMarkers.map(e => createFeedback(e, this.value));
    this.errorMarkerChanges.emit(feedbacks);
  }

  private getCurrentModelUri(): monaco.Uri {
    const pathId = this.getCurrentModelPath();
    return new monaco.Uri()
      .with({ scheme: 'inmemory' })
      .with({ authority: 'model' })
      .with({ path: '/' + pathId });
  }

  private getCurrentModelPath(): string {
    const id = this.model.id;
    return id.split('$model')[1];
  }

  /**
   * Upon destruction of the component we make sure to dispose both the editor and the extra libs that we might've loaded
   */
  ngOnDestroy() {
    this.editor.dispose();
    this.subs.forEach(s => s.unsubscribe());
  }

  /**
   * WriteValue
   * Implements ControlValueAccessor
   *
   * @param value
   */
  writeValue(value: string) {
    this.executeAfterInitialized(() => {
      this.model.setValue(value || '');
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
    const lineCount = this.model.getLineCount();
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
