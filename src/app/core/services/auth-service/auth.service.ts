import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { authData } from '../../models/app.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://entertainment-web-app-backend-2.onrender.com/api';

  constructor(private http: HttpClient) {}

  signUp(signUpData: authData): Observable<any> {
    console.log('About to register user : ', signUpData);
    return this.http.post<any>(`${this.apiUrl}/register`, signUpData);
  }

  login(loginData: authData): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, loginData).pipe(
      tap((response) => {
        console.log('response from login request: ', response);
      })
    );
  }

  getToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }
}
