import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ErrorHandlerService {
  constructor(private toastr: ToastrService) {}

  handleErrorResponse(error: any) {
    if (typeof error === 'string') {
      this.toastr.error(error);
    } else if (error instanceof HttpErrorResponse) {
      this.toastr.error(error.message);
    } else {
      this.toastr.error('Unknown error');
    }
  }
}
