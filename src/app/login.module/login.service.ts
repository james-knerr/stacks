import { Injectable } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { cacheKeys } from '../app.constants';

@Injectable()
export class LoginService {

  constructor(private _router: Router,
    private _location: Location) {
  }

  public processLogin() {
    localStorage.setItem(cacheKeys.idToken, cacheKeys.placeholderToken);
    this._router.navigate(['/app']);
  }

  public authenticated() {
    if (localStorage.getItem(cacheKeys.idToken)) {
      return true;
    } else {
      return false;
    }
  }
  public logout() {
    localStorage.clear();
  }
}


