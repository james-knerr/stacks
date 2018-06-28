import { Injectable } from '@angular/core';
import { CacheService } from 'ng2-cache';
import { cacheKeys } from '../../app.constants';
import { SessionInfoVM } from '../../shared.module/models/login-vm';

@Injectable()
export class AuthService {

  constructor(
    private _cacheService: CacheService) {
  }

  public isAuthenticated() {
    if (this._cacheService.exists(cacheKeys.sessionInfo)) {
      const sessionInfo = <SessionInfoVM>this._cacheService.get(cacheKeys.sessionInfo);
      if (sessionInfo.idToken) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}


