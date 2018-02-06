import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../common/auth/auth.service';
import { User } from '../model/user';
import { ToastrService } from 'ngx-toastr';

function passwordMatcher(
  group: AbstractControl
): { [key: string]: boolean } | null {
  const c1 = group.get('password');
  const c2 = group.get('confirmPassword');
  if (c1.pristine || c2.pristine) {
    return null;
  }
  if (c1.value !== c2.value) {
    return { match: true };
  }
  return null;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  form: FormGroup;
  user = new User();

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          ,
          Validators.minLength(3),
          Validators.maxLength(50)
        ]
      ],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/
          )
        ]
      ],
      passwordGroup: this.fb.group(
        {
          password: [null, [Validators.required, Validators.minLength(6)]],
          confirmPassword: [
            null,
            [Validators.required, Validators.minLength(6)]
          ]
        },
        { validator: passwordMatcher }
      )
    });
  }

  signup() {
    this.auth
      .signUp(this.user)
      .subscribe(() => this.router.navigate(['/']), err => this.showError(err));
  }

  showError(message: string) {
    this.toastr.error(message, 'Error');
  }
}
