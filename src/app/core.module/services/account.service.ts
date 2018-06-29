import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable} from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from 'ng2-cache';
import { ConfigurationService } from './configuration.service';
import { ErrorHandlerService } from './error-handler.service';
import { LoginVM, LoginResponseVM } from '../../shared.module/models/login-vm';
import { cacheKeys } from '../../app.constants';
import { environment } from '../../../environments/environment';

@Injectable()
export class AccountService {
    private apiUrl = environment.apiServer + '/accounts';
    constructor(
        private _httpClient: HttpClient,
        private _errorService: ErrorHandlerService,
        private _configService: ConfigurationService,
        private _cacheService: CacheService) {
    }

    public login(vm: LoginVM): Observable<LoginResponseVM> {
        return this._httpClient.post(`${this.apiUrl}/sign-in`, vm)
        .pipe(map((resp: any) => {
            const response = <LoginResponseVM>resp;
            this._cacheService.set(cacheKeys.sessionInfo, response.sessionInfo, { maxAge: this._configService.maxAge });
            this._cacheService.set(cacheKeys.stacks, response.stacks, { maxAge: this._configService.maxAge });
            return response;
        }),
        catchError(this._errorService.handleError('sign-in', null)));
    }
    /*
    public register(vm: RegisterVM): Observable<LoginResponseVM> {
        return this._authHttp.post(`${this.baseUrl}/register`, vm)
            .map((resp: Response) => <LoginResponseVM>resp.json())
            .catch(this._authHttp.handleError);
    }
    public resetPassword(vm: PasswordResetVM): Observable<any> {
        return this._authHttp.post(`${this.baseUrl}/reset-password`, vm)
            .map((resp: Response) => <any>resp.json())
            .catch(this._authHttp.handleError);
    }
    */
}

