import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../shared/services/auth.service';
import { AuthResponse, User } from '../../../shared/intrfaces';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.scss']
})
export class SignInPageComponent implements OnInit {

  form: FormGroup;
  submitting = false;

  constructor(
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ]),
    });
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    this.submitting = true;

    const user: User = {
      email: this.form.get('email').value,
      password: this.form.get('password').value
    };

    this.authService.signIn(user).subscribe((response: AuthResponse) => {
      this.form.reset();
      this.router.navigate(['/']);
      this.submitting = false;
    }, () => {
      this.submitting = false;
    });
  }
}
