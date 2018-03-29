import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { AppCommonModule } from '../../common/common.module';
import { mockSeries } from '../../common/test';
import { Series } from '../../model';
import * as rootStore from '../../store';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { SeriesFormComponent } from './series-form.component';
import { MonacoLoaderService } from '../../code-editor/monaco-loader.service';

describe('SeriesFormComponent', () => {
  let component: SeriesFormComponent;
  let fixture: ComponentFixture<SeriesFormComponent>;
  let monacoLoader: MonacoLoaderService;

  beforeEach(
    async(() => {
      TestBed.configureTestingModule({
        declarations: [SeriesFormComponent, ExerciseFormComponent],
        providers: [MonacoLoaderService],
        imports: [
          CommonModule,
          FormsModule,
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
        fixture = TestBed.createComponent(SeriesFormComponent);
        component = fixture.componentInstance;
        component.model = new Series(mockSeries[0]);
        fixture.detectChanges();
        done();
      }
    });
  });

  it('should initialize with single item', () => {
    expect(component).toBeTruthy();
    expect(component.model.items.length).toBe(3);
  });

  it('should add an exercise', () => {
    try {
      component.addExercise();
      expect(component.model.items.length).toBe(4);
    } catch (e) {
      console.log('e');
      console.log(e);
      console.log(e.message);
    }
  });

  it('should remove an exercise', () => {
    component.addExercise();
    component.removeExercise(0);
    expect(component.model.items.length).toBe(3);
  });
});
