import { CommonModule } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { CodeEditorModule } from '../../code-editor/code-editor.module';
import { MonacoLoaderService } from '../../code-editor/monaco-loader.service';
import { AppCommonModule } from '../../common/common.module';
import { mockSeries } from '../../common/test';
import * as rootStore from '../../store';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';
import { SeriesFormComponent } from './series-form.component';

describe('SeriesFormComponent', () => {
  let component: SeriesFormComponent;
  let fixture: ComponentFixture<SeriesFormComponent>;
  let monacoLoader: MonacoLoaderService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SeriesFormComponent, ExerciseFormComponent],
      providers: [MonacoLoaderService],
      imports: [
        CommonModule,
        ReactiveFormsModule,
        CodeEditorModule,
        AppCommonModule,
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
        fixture = TestBed.createComponent(SeriesFormComponent);
        component = fixture.componentInstance;
        component.model = mockSeries[0];
        fixture.detectChanges();
        done();
      }
    });
  });

  it('should initialize with test data', () => {
    expect(component).toBeTruthy();
    expect(component.model.items.length).toBe(3);
    expect(component.items.length).toBe(3);
    expect(component.items.at(0).value.description).toEqual(
      component.model.items[0].description
    );
    expect(component.items.at(0).value.code.exercise).toEqual(
      component.model.items[0].exercise
    );
    expect(component.items.at(1).value.description).toEqual(
      component.model.items[1].description
    );
  });

  it('should add an exercise', () => {
    component.addExercise();
    expect(component.items.length).toBe(4);
    expect(component.items.at(0).value.code.exercise).toEqual(
      component.model.items[0].exercise
    );
  });

  it('should remove an exercise', () => {
    component.addExercise();
    component.removeExercise(0);
    expect(component.model.items.length).toBe(3);
  });
});
