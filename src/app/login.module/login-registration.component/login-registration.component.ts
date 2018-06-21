import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { LoginService } from '../login.service';
// import { RegisterVM } from '../../shared.module/models/login-vm';

@Component({
  selector: 'app-login-registration',
  templateUrl: './login-registration.component.html',
  styleUrls: ['./login-registration.component.scss']
})
export class LoginRegistrationComponent implements OnInit {
  public isBusy = false;
  public is18YearsOrOlder = false;
  public hasAgreedToTerms = false;
  // public registerVM: RegisterVM;

  constructor(
    private _snackBar: SnackBarService,
    private _router: Router,
    private _loginService: LoginService) {

   // this.registerVM = new RegisterVM();
  }

  ngOnInit() {
    if (this._loginService.authenticated()) {
      this._router.navigate(['../../main.module/main-page']);
    }
  }
  public register() {
    /*
    this.isBusy = true;
    this._accntService.register(this.registerVM)
      .subscribe(k => {
        this._loginService.processLogin(k);
        this.isBusy = false;
      },
      err => {
        this._snackBar.open('error', err, 'OK');
        this.isBusy = false;
      });*/
  }
  public pressedKey(key: any) {
    if (key === 13) {
      // if (this.registerVM.username && this.registerVM.password && this.registerVM.passwordConfirm) {
      //  this.register();
      // }
    }
  }

  public ageChecked(evt: any) {
    this.is18YearsOrOlder = evt.checked;
  }
  public termsChecked(evt: any) {
    this.hasAgreedToTerms = evt.checked;
  }
}
