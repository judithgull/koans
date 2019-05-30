import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { EditableMarkerService } from './editable-marker.service';
import { ExerciseFeedbackComponent } from './exercise-feedback/exercise-feedback.component';
import { JsLibsService } from './js-libs.service';
import { LogoComponent } from './widgets/logo/logo.component';
import { SeriesIconComponent } from './widgets/series-icon/series-icon.component';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { ValidationService } from './validation-messages/validation.service';

@NgModule({
  imports: [CommonModule, ReactiveFormsModule],
  declarations: [
    ValidationMessagesComponent,
    LogoComponent,
    ExerciseFeedbackComponent,
    SeriesIconComponent
  ],
  exports: [
    ValidationMessagesComponent,
    LogoComponent,
    ExerciseFeedbackComponent,
    SeriesIconComponent
  ],
  providers: [ValidationService, EditableMarkerService, JsLibsService]
})
export class AppCommonModule {}
