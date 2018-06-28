import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { AuthService } from '../../core.module/services/auth.service';
import { AccountService } from '../../core.module/services/account.service';
import { LoginVM } from '../../shared.module/models/login-vm';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public loginVM = new LoginVM();
  public isBusy = false;

  constructor(
    private _accountService: AccountService,
    private _snackBar: SnackBarService,
    private _router: Router,
    private _authService: AuthService) {
  }

  ngOnInit() {
    if (this._authService.isAuthenticated()) {
      this._router.navigate(['app']);
    }
  }

  public login() {
    this.isBusy = true;
    this._accountService.login(this.loginVM)
      .subscribe(k => {
        this.isBusy = false;
        this._router.navigate(['/app']);
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isBusy = false;
      });
  }

  public pressedKey(key: any) {
    if (key === 13) {
      if (this.loginVM.username && this.loginVM.password) {
        this.login();
      }
    }
  }
}
