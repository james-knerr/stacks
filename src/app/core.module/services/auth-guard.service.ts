import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(
    private _authService: AuthService,
    private router: Router) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this._authService.isAuthenticated()) {
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
