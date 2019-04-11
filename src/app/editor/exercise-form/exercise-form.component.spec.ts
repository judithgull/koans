import { AppCommonModule } from '../../common/common.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormComponent } from './exercise-form.component';
import { StoreModule } from '@ngrx/store';

import * as rootStore from '../../store';
import { EffectsModule } from '@ngrx/effects';
import { MonacoLoaderService } from '../../code-editor/monaco-loader.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let monacoLoader: MonacoLoaderService;
  let fb: FormBuilder;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExerciseFormComponent],
      providers: [MonacoLoaderService, FormBuilder],
      imports: [
        ReactiveFormsModule,
        CodeEditorModule,
        AppCommonModule,
        HttpClientTestingModule,
        StoreModule.forRoot({
          ...rootStore.reducers
        }),
        EffectsModule.forRoot([])
      ]
    }).compileComponents();
    fb = TestBed.get(FormBuilder);
  }));

  beforeEach(done => {
    monacoLoader = TestBed.get(MonacoLoaderService);
    monacoLoader.isMonacoLoaded.subscribe(loaded => {
      if (loaded) {
        fixture = TestBed.createComponent(ExerciseFormComponent);
        component = fixture.componentInstance;
        done();
      }
    });
  });

  it('should create', () => {
    component.form = fb.group({
      title: 'title',
      description: 'desc',
      code: fb.group({
        exercise: ['ex'],
        solution: 'sol'
      })
    });

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
