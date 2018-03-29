import { Component, OnInit } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { ErrorMarker, Feedback, ProgrammingLanguage } from '../model';
import * as rootStore from '../store';
import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { CodeExecutorService } from './validation';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;
  const testScript = 'let x = 1;';

  let editorControl: AbstractControl;
  let el;
  let de;

  const initialValue = testScript;
  let monacoLoader: MonacoLoaderService;

  class MockCodeExecutorService {}

  describe('Component', () => {
    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [CodeEditorComponent],
          providers: [
            MonacoLoaderService,
            { provide: CodeExecutorService, useClass: MockCodeExecutorService }
          ],
          imports: [
            ReactiveFormsModule,
            StoreModule.forRoot({
              ...rootStore.reducers
            })
          ]
        }).compileComponents();
      })
    );

    beforeEach(done => {
      monacoLoader = TestBed.get(MonacoLoaderService);
      monacoLoader.isMonacoLoaded.subscribe(loaded => {
        if (loaded) {
          fixture = TestBed.createComponent(CodeEditorComponent);
          component = fixture.componentInstance;
          component.path = 'path' + new Date().getTime();
          fixture.detectChanges();
          done();
        }
      });
    });

    it('should call onChange function when changing value', done => {
      expect(component).toBeTruthy();
      component.registerOnChange(value => {
        if (value === 'y') {
          done();
        }
      });
      component.writeValue('y');
      component.language = ProgrammingLanguage.typescript;
    });

    it('should change the value after typing it', done => {
      component.language = ProgrammingLanguage.typescript;
      component.registerOnChange(value => {
        expect(value).toBe(testScript);
        done();
      });

      component.initialized.subscribe(value => {
        if (value) {
          component.editor.trigger('source', 'type', { text: testScript });
        }
      });
    });
  });

  describe('Form', () => {
    let containerFixture: ComponentFixture<TestContainerComponent>;
    let testContainer: TestContainerComponent;

    @Component({
      template: `
    <form [formGroup]="form">
    <app-code-editor path='path' formControlName='editorValue' language="typescript" (errorMarkerChanges)="onErrorChanges()"></app-code-editor>
    </form>
    `
    })
    class TestContainerComponent implements OnInit {
      form: FormGroup;
      errorMarkers: Feedback[];
      constructor(private fb: FormBuilder) {}

      ngOnInit(): void {
        this.form = this.fb.group({
          editorValue: [initialValue]
        });
      }

      onErrorChanges(errorMarkers: Feedback[]) {
        this.errorMarkers = errorMarkers;
      }
    }

    beforeEach(
      async(() => {
        TestBed.configureTestingModule({
          declarations: [CodeEditorComponent, TestContainerComponent],
          providers: [
            MonacoLoaderService,
            { provide: CodeExecutorService, useClass: MockCodeExecutorService }
          ],
          imports: [
            ReactiveFormsModule,
            StoreModule.forRoot({
              ...rootStore.reducers
            })
          ]
        }).compileComponents();
      })
    );

    beforeEach(done => {
      monacoLoader = TestBed.get(MonacoLoaderService);
      monacoLoader.isMonacoLoaded.subscribe(loaded => {
        if (loaded) {
          containerFixture = TestBed.createComponent(TestContainerComponent);
          testContainer = containerFixture.componentInstance;
          containerFixture.detectChanges();

          editorControl = testContainer.form.controls['editorValue'];
          el = containerFixture.nativeElement;
          de = containerFixture.debugElement;
          done();
        }
      });
    });

    it('should be initialized with the initial value', () => {
      expect(editorControl.value).toEqual(testScript);
      expect(editorControl.valid).toBe(true);
      expect(editorControl.touched).toBe(false);
      expect(editorControl.dirty).toBe(false);
    });
  });
});
