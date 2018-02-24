import { Feedback2, FeedbackFactory, SourceType } from '../../common/model';
import { Injectable } from '@angular/core';
import { EditableMarkerService } from '../../common/editable-marker.service';

@Injectable()
export class CodeEditorValidationSerivce {
  public placeholderValidationMessage = 'Please replace ??? with the correct answer!';
  public emptyErrorMessage = 'Editor cannot be empty!';
  constructor(private service: EditableMarkerService) {}

  validate(text: string): Feedback2 {
    if (!text) {
      return FeedbackFactory.createError(
        SourceType.Validation,
        this.emptyErrorMessage,
        text
      );
    }
    if (this.service.containsMarker(text)) {
      return FeedbackFactory.createError(
        SourceType.Validation,
        this.placeholderValidationMessage,
        text
      );
    }
    return FeedbackFactory.createSuccess(SourceType.Validation, text);
  }
}
