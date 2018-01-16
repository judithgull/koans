import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AuthService } from './auth/auth.service';
import { LogoComponent } from './logo/logo.component';
import { SeriesService } from './series.service';
import { ValidationMessagesComponent } from './validation-messages/validation-messages.component';
import { ValidationService } from './validation-messages/validation.service';
import { EditableMarkerService } from './editable-marker.service';
import { ExerciseFeedbackComponent } from './exercise-feedback/exercise-feedback.component';
import { SeriesIconComponent } from './series-icon/series-icon.component';

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
    SeriesService,
    AuthService,
    EditableMarkerService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AppCommonModule {}
