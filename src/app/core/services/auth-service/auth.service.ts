import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { authData } from '../../models/app.model';
import { environment } from '../../../../environments/environment.development';
import { LocalStorageService } from '../local-storage-service/local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  signUp(signUpData: authData): Observable<any> {
    console.log('About to register user : ', signUpData);
    return this.http
      .post<authData>(`${environment.apiUrl}/register`, signUpData)
      .pipe(
        catchError((error) => {
          // Handle the error and pass the message to the subscriber
          console.error('Error from register request: ', error);
          return throwError(() => new Error(error));
        })
      );
  }

  login(loginData: authData): Observable<any> {
    return this.http
      .post<authData>(`${environment.apiUrl}/login`, loginData)
      .pipe(
        tap((response) => {
          console.log('response from login request: ', response);
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('AUTH_TOKEN');
  }

  logOut(): void {
    this.localStorageService.removeItem('AUTH_TOKEN');
  }
}
