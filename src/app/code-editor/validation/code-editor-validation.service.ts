import { Injectable } from '@angular/core';

import { EditableMarkerService } from '../../common/editable-marker.service';
import { ErrorMarker } from '../../model';

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
          startLineNumber: 1
        }
      ];
    }
    const placeHolderErrors = this.service
      .getPlaceholders(text)
      .map(p => this.toErrorMarker(p));

    return placeHolderErrors;
  }

  toErrorMarker(p: { row: number; col: number }): ErrorMarker {
    return {
      message: this.placeholderValidationMessage,
      startLineNumber: p.row + 1
    };
  }
}
