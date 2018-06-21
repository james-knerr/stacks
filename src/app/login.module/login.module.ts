import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
MatIconModule,
MatCardModule,
MatSnackBarModule,
MatSnackBar,
MatToolbarModule,
MatInputModule,
MatButtonModule,
MatCheckboxModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LoginRoutingModule } from './login-routing.module';


import { LoginComponent } from './login.component/login.component';
import { LoginRegistrationComponent } from './login-registration.component/login-registration.component';
import { LoginPageComponent } from './login-page.component/login-page.component';
import { LoginForgotPasswordComponent } from './login-forgot-password.component/login-forgot-password.component';
import { LoginRegistrationTermsComponent } from './login-registration-terms.component/login-registration-terms.component';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    FormsModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    LoginRoutingModule
  ],
  declarations: [
    LoginComponent,
    LoginRegistrationComponent,
    LoginPageComponent,
    LoginForgotPasswordComponent,
    LoginRegistrationTermsComponent
  ],
  providers: [MatSnackBar]
})
export class LoginModule { }
