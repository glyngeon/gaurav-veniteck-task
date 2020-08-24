import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from './../../environments/environment';

@Injectable({
    providedIn: 'root',
})
export class HttpHandlerService {
    constructor(public http: HttpClient) {}
    public headers: {} = { headers: { 'Content-Type': 'application/json; charset=utf-8' } };

    public getUrl() {
        return environment.apiUrl;
    }

    loginCall(reqParam: any) {
        return this.http.post('https://reqres.in/api/login', reqParam, this.headers);
    }

    usersCall() {
        return this.http.get('https://reqres.in/api/users');
    }

    userDetailCall(reqParam) {
        return this.http.get('https://reqres.in/api/users/' + reqParam);
    }
}
