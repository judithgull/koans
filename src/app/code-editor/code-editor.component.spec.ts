import { By } from '@angular/platform-browser';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule
} from '@angular/forms';
import { IError } from 'protractor/built/exitCodes';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeEditorComponent } from './code-editor.component';
import { MonacoLoaderService } from './monaco-loader.service';
import { Component, OnInit } from '@angular/core';
import { Feedback } from '../common/model/feedback';
import { CodeExecutorService } from './code-executor.service';
import { ProgrammingLanguage } from '../common/model/programming-language';

describe('CodeEditorComponent', () => {
  let component: CodeEditorComponent;
  let fixture: ComponentFixture<CodeEditorComponent>;
  const testScript = 'let x = 1;';

  let editorControl: AbstractControl;
  let el;
  let de;

  const initialValue = testScript;

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
          imports: [ReactiveFormsModule]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      fixture = TestBed.createComponent(CodeEditorComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should call onChange function when changing value', done => {
      expect(component).toBeTruthy();
      component.registerOnChange(value => {
        if (value === 'x') {
          done();
        }
      });
      component.writeValue('x');
      component.language = ProgrammingLanguage.typescript;
    });

    it('should set an empty string for null', done => {
      component.registerOnChange(value => {
        if (value === '') {
          done();
        }
      });
      component.writeValue(null);
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

    it('should emit error markers for invalid content', done => {
      component.errorMarkerChanges.subscribe((error: Feedback[]) => {
        expect(error.length).toBe(1);
        expect(error[0].source).toEqual('monaco');
        expect(error[0].startLineNumber).toBe(1);
        done();
      });
      component.language = ProgrammingLanguage.typescript;
      component.writeValue('x');
    });
  });

  describe('Form', () => {
    let containerFixture: ComponentFixture<TestContainerComponent>;
    let testContainer: TestContainerComponent;

    @Component({
      template: `
    <form [formGroup]="form">
    <app-code-editor formControlName='editorValue' language="typescript" (errorMarkerChanges)="onErrorChanges()"></app-code-editor>
    </form>
    `
    })
    class TestContainerComponent implements OnInit {
      form: FormGroup;
      errorMarkers: IError[];
      constructor(private fb: FormBuilder) {}

      ngOnInit(): void {
        this.form = this.fb.group({
          editorValue: [initialValue]
        });
      }

      onErrorChanges(errorMarkers: IError[]) {
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
          imports: [ReactiveFormsModule]
        }).compileComponents();
      })
    );

    beforeEach(() => {
      containerFixture = TestBed.createComponent(TestContainerComponent);
      testContainer = containerFixture.componentInstance;
      containerFixture.detectChanges();

      editorControl = testContainer.form.controls['editorValue'];
      el = containerFixture.nativeElement;
      de = containerFixture.debugElement;
    });

    it('should be initialized with the initial value', () => {
      expect(editorControl.value).toEqual(testScript);
      expect(editorControl.valid).toBe(true);
      expect(editorControl.touched).toBe(false);
      expect(editorControl.dirty).toBe(false);
    });
  });
});
