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
import * as R from 'ramda';

import {
  ErrorMarker,
  ModelState,
  ProgrammingLanguage,
  SourceType
} from '../model';
import {
  filterEqualLines,
  getSortedErrorMarkers,
  toErrorMarker,
  toMarkerData
} from './marker-data-util';
import {
  ModelValueChange,
  createResultAction,
  EditorModelEntities,
  getValidationResult
} from '../store';

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
  constructor(private store: Store<EditorModelEntities>) { }

  @ViewChild('editor') editorContent: ElementRef;

  @Output() errorMarkerChanges = new EventEmitter<ErrorMarker[]>();

  @Output() editorModelChange = new EventEmitter<ModelState>();

  editor: monaco.editor.IStandaloneCodeEditor;

  initialized = new BehaviorSubject<boolean>(false);

  height = 100;

  private _modelConfig: { path: string, initialValue: string };
  uri: monaco.Uri;

  private _language: ProgrammingLanguage;

  private monacoMarkers: monaco.editor.IMarker[];

  private subs: Subscription[] = [];
  private disposables: monaco.IDisposable[] = [];

  // tslint:disable-next-line:no-empty
  onChange: (_: string) => void = () => { };
  // tslint:disable-next-line:no-empty
  onTouched: () => void = () => { };

  ngOnInit(): void {
    this.initEditor();
  }

  getOrCreateModel(): monaco.editor.IModel {
    const exisitngModel = monaco.editor.getModel(this.uri);
    if (exisitngModel) {
      return exisitngModel;
    }
    const model = monaco.editor.createModel(this._modelConfig.initialValue, this.language, this.uri);
    this.initModel(model);
    return model;
  }

  private initModel(model: monaco.editor.ITextModel) {
    this.disposables.push(
      model.onDidChangeContent(e => {
        this.editorModelChange.emit(this.modelState);
        this.store.dispatch(new ModelValueChange(this.modelState));
        this.onChange(this.value);
        this.height = this.computeHeight();
      })
    );
    this.disposables.push(
      model.onDidChangeDecorations(e => {
        if (
          this.model &&
          !R.equals(this.monacoMarkers, this.getMonacoMarkers())
        ) {
          this.monacoMarkers = this.getMonacoMarkers();
          this.dispatchMonacoErrors();
        }
      })
    );
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

  @Input()
  set modelConfig(config: { path: string, initialValue: string }) {
    this._modelConfig = config;
    this.uri = monaco.Uri.file(this.path);
    if (this.editor) {
      this.editor.setModel(this.getOrCreateModel());
    }
  }

  get path(): string {
    return this._modelConfig.path;
  }

  get modelState(): ModelState {
    return {
      id: this.path,
      versionId: this.model.getVersionId(),
      value: this.value,
      progLang: this.language
    };
  }

  initEditor() {
    const editorDiv: HTMLDivElement = this.editorContent.nativeElement;

    this.editor = monaco.editor.create(editorDiv, {
      language: this.language,
      model: this.getOrCreateModel(),
      theme: 'vs-dark',
      minimap: {
        enabled: false
      },
      glyphMargin: true
    });


    this.editor.onKeyUp(e => {
      this.onTouched();
    });

    this.editor.layout();

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
          const markers = e.validation.errors.map(toMarkerData);
          this.setMarkers(SourceType.validation.toString(), markers);
        }
      })
    );

    this.initialized.next(true);
  }

  private dispatchMonacoErrors() {
    const monacoFeedbacks = this.monacoMarkers.map(toErrorMarker);

    this.store.dispatch(
      createResultAction(SourceType.monaco, this.modelState, monacoFeedbacks)
    );
  }

  private getMonacoMarkers() {
    return this.getMarkers()
      .filter(m => m.owner !== SourceType.validation)
      .filter(m => m.owner !== SourceType.execution);
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

  /**
   * Upon destruction of the component we make sure to dispose both the editor and the extra libs that we might've loaded
   */
  ngOnDestroy() {
    this.disposables.forEach(d => d.dispose());
    if (this.model) {
      this.model.dispose();
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
    if (value !== null) {
      this.executeAfterInitialized(() => {
        this.model.setValue(value || '');
        this.editor.layout();
      });
    }
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
    const minHeigth = 100;
    return Math.max(minHeigth, Math.max(defaultHeight, editorHeight));
  }

  @HostListener('window:resize')
  onResize() {
    this.editor.layout();
  }
}
