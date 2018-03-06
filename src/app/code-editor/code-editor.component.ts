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
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { filter } from 'rxjs/operators';

import {
  Feedback2,
  ModelState,
  ProgrammingLanguage,
  SourceType
} from '../model';
import {
  createErrorMarkers,
  createFeedback,
  createMarkerData,
  filterEqualLines,
  getSortedErrorMarkers
} from './marker-data-util';
import { MonacoLoaderService } from './monaco-loader.service';
import {
  ChangeModelValueAction,
  createResultAction,
  EditorModelEntities,
  getValidationResult
} from './store';

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
    private store: Store<EditorModelEntities>
  ) {}

  @ViewChild('editor') editorContent: ElementRef;

  @Output() errorMarkerChanges = new EventEmitter<Feedback2[]>();

  @Output() editorModelChange = new EventEmitter<ModelState>();

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

  get modelState(): ModelState {
    return {
      id: this.model.id,
      versionId: this.model.getVersionId(),
      value: this.value,
      progLang: this.language
    };
  }

  initEditor() {
    const editorDiv: HTMLDivElement = this.editorContent.nativeElement;

    this.editor = monaco.editor.create(editorDiv, {
      language: ProgrammingLanguage.javascript.toString(),
      theme: 'vs-dark'
    });

    this.model.onDidChangeContent(e => {
      this.editorModelChange.emit(this.modelState);
      this.store.dispatch(new ChangeModelValueAction(this.modelState));

      this.onChange(this.value);
      this.height = this.computeHeight();
    });

    this.editor.onKeyUp(e => {
      this.onTouched();
    });

    this.height = this.computeHeight();

    this.editor.layout();

    this.uri = this.getCurrentModelUri();

    const validationResults = this.store
      .select(getValidationResult(this.model.id))
      .pipe(
        filter(e => e && e.validation && true),
        filter(e => e.versionId === this.model.getVersionId())
      );

    this.subs.push(
      validationResults.subscribe(e => {
        if (e.validation.success) {
          this.clearMarkers(SourceType.validation.toString());
        } else {
          const markers = e.validation.errors.map(e => createMarkerData(e));
          this.setMarkers(SourceType.validation.toString(), markers);
        }
      })
    );

    this.model.onDidChangeDecorations(e => {
      this.dispatchMonacoErrors();

      // emit all error markers filtered by equal lines
      const filteredMarkers = filterEqualLines(this.getMarkers());
      const feedbacks = filteredMarkers.map(e => createFeedback(e, this.value));
      this.errorMarkerChanges.emit(feedbacks);
    });

    this.initialized.next(true);
  }

  private dispatchMonacoErrors() {
    const monacoFeedbacks = this.getMarkers()
      .filter(m => m.owner !== SourceType.validation)
      .filter(m => m.owner !== SourceType.execution)
      .map(createErrorMarkers);

    this.store.dispatch(
      createResultAction(SourceType.monaco, this.modelState, monacoFeedbacks)
    );
  }

  private getMarkers(): monaco.editor.IMarker[] {
    const modelMarkers = monaco.editor.getModelMarkers({
      resource: this.uri
    });
    return getSortedErrorMarkers(modelMarkers);
  }

  ngAfterViewChecked(): void {
    if (this.editor) {
      this.editor.layout();
    }
  }

  private setMarkers(owner: string, markers: monaco.editor.IMarkerData[]) {
    monaco.editor.setModelMarkers(this.model, owner, markers);
  }

  private clearMarkers(owner: string) {
    monaco.editor.setModelMarkers(this.model, owner, []);
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
    if (this.editor) {
      this.editor.dispose();
    }

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
