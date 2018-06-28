import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { LoginService } from '../../login.module/login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: LoginService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.authenticated()) {
      if (state.url === '/' || state.url === 'auth') {
        this.router.navigate(['auth']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['auth']);
      return false;
    }
  }

}
