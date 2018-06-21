import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

import { StackListVM, StackVM } from '../shared.module/models/stack-vm';

@Injectable()
export class MainService {
    stackUpdated$: Observable<StackVM>;
    private stackUpdatedSubject: BehaviorSubject<StackVM>;
    private headers = new Headers({ 'Content-Type': 'application/json' });
    private apiUrl = 'api';  // URL to web api

    constructor(private _httpClient: HttpClient) {
        this.stackUpdatedSubject = new BehaviorSubject<StackVM>(new StackVM());
        this.stackUpdated$ = this.stackUpdatedSubject.asObservable();
     }

    public getStacks(): Observable<StackListVM[]> {
        return this._httpClient.get<StackListVM[]>(`${this.apiUrl}/STACKS`);
    }
    public getStack(stackId: string): Observable<StackVM[]> {
        return this._httpClient.get<StackVM[]>(`${this.apiUrl}/STACK_CONTENT`);
    }
    // add record
    public updateStack(stack: StackVM): Observable<StackVM> {
        const k = this._httpClient.post<StackVM>(`${this.apiUrl}/STACK_CONTENT`, stack);
        this.stackUpdatedSubject.next(stack);
        return k;
    }
    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}
