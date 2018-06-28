import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../core.module/services/snackbar.service';
// import { PasswordResetVM } from '../../shared.module/models/login-vm';

@Component({
  selector: 'app-login-forgot-password',
  templateUrl: './login-forgot-password.component.html',
  styleUrls: ['./login-forgot-password.component.scss']
})
export class LoginForgotPasswordComponent {

 // public passwordResetVM: PasswordResetVM;
  public isBusy = false;
  constructor(
    private _snackBar: SnackBarService,
    private _router: Router) {
   // this.passwordResetVM = new PasswordResetVM();
  }

  public passwordReset() {
    /*
    this.isBusy = true;
    this._accntService.resetPassword(this.passwordResetVM)
      .subscribe(k => {
        this._snackBar.open('info', 'If the email address exists in the system a password reset request will be sent.', 'OK');
        this.isBusy = false;
      },
      err => {
        this.isBusy = false;
        this._snackBar.open('error', err, 'OK');
      });*/
  }
  public pressedKey(key: any) {
    if (key === 13) {
      // if (this.passwordResetVM.email) {
      //  this.passwordReset();
      // }
    }
  }
}
