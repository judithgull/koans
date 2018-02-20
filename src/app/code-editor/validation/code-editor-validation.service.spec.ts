import { CodeEditorValidationSerivce } from './code-editor-validation.service';
import { inject, TestBed } from '@angular/core/testing';
import { FeedbackFactory, SourceType } from '../../common/model';
import { EditableMarkerService } from '../../common/editable-marker.service';

describe('Editor validation service', () => {
  let service: CodeEditorValidationSerivce;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CodeEditorValidationSerivce, EditableMarkerService]
    });
    service = TestBed.get(CodeEditorValidationSerivce);
  });

  it('Should not error on empty value', () => {
    expect(service.validate('')).toEqual(
      FeedbackFactory.createSuccess(SourceType.Validation, '')
    );
  });

  it('Should error on placeholder value', () => {
    expect(service.validate('???')).toEqual(
      FeedbackFactory.createError(
        SourceType.Validation,
        service.placeholderValidationMessage,
        '???'
      )
    );
  });
});
