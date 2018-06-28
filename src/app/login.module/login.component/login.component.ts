import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { LoginService } from '../login.service';
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
    private _snackBar: SnackBarService,
    private _router: Router,
    private _loginService: LoginService) {
  }

  ngOnInit() {
    if (this._loginService.authenticated()) {
      this._router.navigate(['app']);
    }
  }
  public login() {
    this._loginService.processLogin();
  }
  public pressedKey(key: any) {
    if (key === 13) {
      if (this.loginVM.username && this.loginVM.password) {
        this.login();
      }
    }
  }
}
