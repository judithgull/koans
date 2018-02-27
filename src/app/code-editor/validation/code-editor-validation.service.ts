import {
  Feedback2,
  FeedbackFactory,
  SourceType,
  ErrorMarker
} from '../../common/model';
import { Injectable } from '@angular/core';
import { EditableMarkerService } from '../../common/editable-marker.service';

@Injectable()
export class CodeEditorValidationSerivce {
  public placeholderValidationMessage = 'Please replace ??? with the correct answer!';
  public emptyErrorMessage = 'Editor cannot be empty!';
  constructor(private service: EditableMarkerService) {}

  validate(text: string): ErrorMarker[] {
    if (!text) {
      return [
        {
          message: this.emptyErrorMessage,
          startLineNumber: -1
        }
      ];
    }
    if (this.service.containsMarker(text)) {
      return [
        {
          message: this.placeholderValidationMessage,
          startLineNumber: -1
        }
      ];
    }
    return [];
  }
}
