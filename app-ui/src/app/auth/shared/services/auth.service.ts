import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { AuthResponse, User } from '../../../shared/intrfaces';
import { environment } from '../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  public error$: Subject<string> = new Subject<string>();

  constructor(private http: HttpClient) {
  }

  getIdentity(): Observable<any> {
    return this.http.get(`${ environment.host }/api/v1/auth/check-user`);
  }

  get token(): string {
    const expDate = new Date(localStorage.getItem('token-exp'));
    if (new Date() > expDate) {
      this.logout();
      return null;
    }
    return localStorage.getItem('token');
  }

  signUp(user: User): Observable<any> {
    return this.http.post(`${ environment.host }/api/v1/auth/sign-up`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  signIn(user: User) {
    return this.http.post(`${ environment.host }/api/v1/auth/sign-in`, user)
      .pipe(
        tap(this.setToken),
        catchError(this.handleError.bind(this))
      );
  }

  logout() {
    this.setToken(null);
  }

  isAuth(): boolean {
    return !!this.token;
  }

  private setToken(response: AuthResponse | null) {
    if (response) {
      const expDate = new Date(response.token.exp * 1000);
      localStorage.setItem('token', response.token.id);
      localStorage.setItem('token-exp', expDate.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    const message = error.error.errors[0].message;
    this.error$.next(message);
    return throwError(error);
  }
}
