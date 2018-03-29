import { AppCommonModule } from '../../common/common.module';
import { Exercise } from '../../model/exercise';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { ReactiveFormsModule } from '@angular/forms';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExerciseFormComponent } from './exercise-form.component';
import { StoreModule, combineReducers } from '@ngrx/store';

import * as rootStore from '../../store';
import { EffectsModule } from '@ngrx/effects';
import { MonacoLoaderService } from '../../code-editor/monaco-loader.service';

describe('ExerciseFormComponent', () => {
  let component: ExerciseFormComponent;
  let fixture: ComponentFixture<ExerciseFormComponent>;
  let monacoLoader: MonacoLoaderService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [ExerciseFormComponent],
        providers: [MonacoLoaderService],
        imports: [
          ReactiveFormsModule,
          CodeEditorModule,
          AppCommonModule,
          StoreModule.forRoot({
            ...rootStore.reducers
          }),
          EffectsModule.forRoot([])
        ]
      }).compileComponents();
    })
  );

  beforeEach(done => {
    monacoLoader = TestBed.get(MonacoLoaderService);
    monacoLoader.isMonacoLoaded.subscribe(loaded => {
      if (loaded) {
        fixture = TestBed.createComponent(ExerciseFormComponent);
        component = fixture.componentInstance;
        component.item = new Exercise();
        fixture.detectChanges();
        done();
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
