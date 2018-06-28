import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from 'ng2-cache';
import { ConfigurationService } from '../core.module/services/configuration.service';
import { ErrorHandlerService } from '../core.module/services/error-handler.service';

import { cacheKeys } from '../app.constants';
import { StackListVM, StackVM } from '../shared.module/models/stack-vm';
import { RecordVM } from '../shared.module/models/record-vm';
import { environment } from '../../environments/environment';

@Injectable()
export class MainService {
    stackUpdated$: Observable<RecordVM>;
    private stackUpdatedSubject: BehaviorSubject<RecordVM>;
    private apiUrl = environment.apiServer + '/stacks';

    constructor(
        private _httpClient: HttpClient,
        private _errorService: ErrorHandlerService,
        private _configService: ConfigurationService,
        private _cacheService: CacheService) {
        this.stackUpdatedSubject = new BehaviorSubject<RecordVM>(new RecordVM());
        this.stackUpdated$ = this.stackUpdatedSubject.asObservable();
     }

    public getStacks(): Observable<StackListVM[]> {
        const cacheKey = cacheKeys.stacks;
        if (this._cacheService.exists(cacheKey)) {
             return of(this._cacheService.get(cacheKey));
         } else {
        return this._httpClient.get<StackListVM[]>(`${this.apiUrl}`)
        .pipe(map((resp: StackListVM[]) => {
            this._cacheService.set(cacheKey, resp, { maxAge: this._configService.maxAge });
            return resp;
        }),
        catchError(this._errorService.handleError('getStacks', [])));
    }
    }
    public getStack(stackId: string): Observable<StackVM> {
        const cacheKey = stackId + cacheKeys.stackDetails;
        if (this._cacheService.exists(cacheKey)) {
             return of(this._cacheService.get(cacheKey));
         } else {
        return this._httpClient.get<StackVM>(`${this.apiUrl}/${stackId}`)
        .pipe(map((resp: StackVM) => {
            this._cacheService.set(cacheKey, resp, { maxAge: this._configService.maxAge });
            return resp;
        }),
        catchError(this._errorService.handleError('getStack', null)));
    }
    }
    public addRecord(record: RecordVM, stackId: string): Observable<RecordVM> {
        return this._httpClient.post<RecordVM>(`${this.apiUrl}/${stackId}`, record)
        .pipe(map((resp: RecordVM) => {
            const cacheKey = stackId + cacheKeys.stackDetails;
            const cacheValue = <StackVM>this._cacheService.get(cacheKey);
            cacheValue.records.push(resp);
            this._cacheService.set(cacheKey, cacheValue, { maxAge: this._configService.maxAge });
            this.stackUpdatedSubject.next(resp);
            return resp;
        }));
    }
    public addStack(stack: StackListVM): Observable<StackListVM> {
        return this._httpClient.post<StackListVM>(`${this.apiUrl}`, stack)
        .pipe(map((resp: StackListVM) => {
            const cacheKey = cacheKeys.stacks;
            const cacheValue = <StackListVM[]>this._cacheService.get(cacheKey);
            cacheValue.push(resp);
            this._cacheService.set(cacheKey, cacheValue, { maxAge: this._configService.maxAge });
            return resp;
        }));
    }
}
