import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from '../../common/auth/auth.service';
import { LoginInfo } from '../../common/model/login-info';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  error: string;
  model: LoginInfo;
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService,
    private vcr: ViewContainerRef
  ) {
    this.model = {
      email: '',
      password: ''
    };
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /**
   * submit and navigate to home
   */
  login(): void {
    this.authService
      .login(this.model)
      .subscribe(() => this.router.navigate(['/']), err => this.showError(err));
  }

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }
}
