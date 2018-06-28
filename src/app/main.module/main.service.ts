import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CacheService } from 'ng2-cache';
import { cacheKeys } from '../app.constants';
import { StackListVM, StackVM } from '../shared.module/models/stack-vm';
import { RecordVM } from '../shared.module/models/record-vm';
import { environment } from '../../environments/environment';

@Injectable()
export class MainService {
    stackUpdated$: Observable<RecordVM>;
    private stackUpdatedSubject: BehaviorSubject<RecordVM>;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = environment.apiServer;  // URL to web api

    constructor(private _httpClient: HttpClient) {
        this.stackUpdatedSubject = new BehaviorSubject<RecordVM>(new RecordVM());
        this.stackUpdated$ = this.stackUpdatedSubject.asObservable();
     }

    public getStacks(): Observable<StackListVM[]> {
        return this._httpClient.get<StackListVM[]>(`${this.apiUrl}/app`)
        .pipe(map((resp: any) => {
            // this._cacheService.set(cacheKey, resp, { maxAge: this._config.maxAge });
            return resp;
        }),
        catchError(this.handleError));
    }
    public getStack(stackId: string): Observable<StackVM> {
        return this._httpClient.get<StackVM>(`${this.apiUrl}/app/${stackId}`).pipe(map((resp: any) => {
            // this._cacheService.set(cacheKey, resp, { maxAge: this._config.maxAge });
            return resp;
        }),
        catchError(this.handleError));
    }
    public addRecord(record: RecordVM, stackId: string): Observable<RecordVM> {
        return this._httpClient.post<RecordVM>(`${this.apiUrl}/app/${stackId}`, record)
        .pipe(map((resp: RecordVM) => {
            // this._cacheService.set(cacheKey, resp, { maxAge: this._config.maxAge });
            this.stackUpdatedSubject.next(resp);
            return resp;
        }),
        catchError(this.handleError));
    }
    public addStack(stack: StackListVM): Observable<StackListVM> {
        return this._httpClient.post<StackListVM>(`${this.apiUrl}/app`, stack).pipe(map((resp: any) => {
            // this._cacheService.set(cacheKey, resp, { maxAge: this._config.maxAge });
            return resp;
        }),
        catchError(this.handleError));
    }

    public handleError(error: any) {
        let errMsg = '';
        if (error && error.status === 0) {
            errMsg = 'We are having trouble communicating with the server.  Please wait a few seconds then try again.';
        } else {
            if (error.message) {
                errMsg = error.message;
            } else {
                errMsg = (typeof error.text === 'function') ? JSON.parse(error.text()).text :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
            }
        }
        return Observable.throw(errMsg);
    }
}
