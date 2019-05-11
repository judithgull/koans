import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesContainerComponent } from './series-container.component';
import { SeriesFormComponent } from '../series-form/series-form.component';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppCommonModule } from '../../common/common.module';
import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { StoreModule } from '@ngrx/store';
import * as rootStore from '../../store';
import { MonacoLoaderService } from '../../code-editor/monaco-loader.service';

describe('SeriesContainerComponent', () => {
  let component: SeriesContainerComponent;
  let fixture: ComponentFixture<SeriesContainerComponent>;
  let monacoLoader: MonacoLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SeriesContainerComponent,
        SeriesFormComponent,
        ExerciseFormComponent
      ],
      providers: [MonacoLoaderService],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppCommonModule,
        CodeEditorModule,
        StoreModule.forRoot({
          ...rootStore.reducers
        })
      ]
    }).compileComponents();
  }));

  beforeEach(done => {
    monacoLoader = TestBed.get(MonacoLoaderService);
    monacoLoader.isMonacoLoaded.subscribe(loaded => {
      if (loaded) {
        fixture = TestBed.createComponent(SeriesContainerComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        done();
      }
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
