import { Injectable } from '@angular/core';
import { AuthResponse, User } from '../models';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {

    private userSubject: BehaviorSubject<User>;
    public user: Observable<User>;

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.userSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('user')!));
        this.user = this.userSubject.asObservable();
    }

    public get userValue() {
        return this.userSubject.value;
    }

    login(username: string, password: string) {
        return this.http.post<AuthResponse>(`${environment.apiUrl}/api/Authentication/authenticate`, { username, password })
            .pipe(map(result => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(result.token));
                this.userSubject.next(result.user);
                return result.token;

            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('user');
        this.userSubject.next(undefined);
        this.router.navigate(['/account/login']);
    }

    publishUpdatedUser(user: User) {
        // publish updated user to subscribers
        this.userSubject.next(user);
    }

}
