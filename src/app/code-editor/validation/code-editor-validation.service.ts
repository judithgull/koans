import { Feedback, FeedbackFactory, SourceType } from '../../common/model';
import { Injectable } from '@angular/core';
import { EditableMarkerService } from '../../common/editable-marker.service';

@Injectable()
export class CodeEditorValidationSerivce {
  public placeholderValidationMessage = 'Please replace ??? with the correct answer!';
  constructor(private service: EditableMarkerService) {}

  validate(text: string): Feedback {
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
