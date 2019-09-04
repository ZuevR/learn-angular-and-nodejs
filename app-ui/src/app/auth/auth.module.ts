import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './shared/components/auth-layout/auth-layout.component';
import { SignInPageComponent } from './sign-in-page/sign-in-page.component';
import { SingUpPageComponent } from './sing-up-page/sing-up-page.component';

@NgModule({
  declarations: [
    AuthLayoutComponent,
    SignInPageComponent,
    SingUpPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {
        path: '', component: AuthLayoutComponent, children: [
          { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
          { path: 'login', component: SignInPageComponent },
          { path: 'registration', component: SingUpPageComponent }
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: []
})
export class AuthModule {

}
