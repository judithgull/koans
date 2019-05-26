import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './auth/auth-interceptor.service';
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
  providers: [
    ValidationService,
    EditableMarkerService,
    JsLibsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppCommonModule {}
