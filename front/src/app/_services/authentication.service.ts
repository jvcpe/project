﻿import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient) { }

    login(username: string, password: string) {
        return this.http.post<any>(`${config.apiUrl}/users/authenticate`, { username: username, password: password })
            .pipe(map(user => {
                if (user && user.token) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }

                return user;
            }));
    }

    getExpiration() {
      const currentUser = JSON.parse(localStorage.getItem('currentUser'));
      return currentUser.token.exp;
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}
