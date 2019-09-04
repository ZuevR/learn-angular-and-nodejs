import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/services/auth.service';
import { CustomValidators } from '../custom.validators';
import { AuthResponse, User } from '../../shared/intrfaces';

@Component({
  selector: 'app-sing-up-page',
  templateUrl: './sing-up-page.component.html',
  styleUrls: ['./sing-up-page.component.scss']
})
export class SingUpPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.minLength(2)
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6)
      ]),
      passwordConfirm: new FormControl(null)
    }, { validators: CustomValidators.compareWith('password', 'passwordConfirm') });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const user: User = {
      name: this.form.get('name').value,
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.authService.signUp(user).subscribe((response: AuthResponse) => {
      this.form.reset();
      this.router.navigate(['/']);
      this.submitting = false;
    }, () => {
      this.submitting = false;
    });
  }
}
