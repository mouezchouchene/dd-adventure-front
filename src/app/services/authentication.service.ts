import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegisterRequest } from '../models/register-request';
import { RegisterResponse } from '../models/register-response';

const BASE_URL = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'jwtToken';

  private authState = new BehaviorSubject<boolean>(this.isLoggedIn());
  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Promise<any> {
    const url = BASE_URL + 'login';
    return this.http.post<{ jwt: string }>(url, credentials)
      .pipe(
        map(response => {
          const token = response.jwt;
          if (token) {
            this.saveToken(token);
            this.authState.next(true);
            const decodedToken = this.decodeToken(token);
            this.redirectUserBasedOnRole(decodedToken.role);
            return decodedToken;
          } else {
            throw new Error("No JWT received");
          }
        }),
        catchError(error => {
          console.error('Login error:', error);
          return throwError("Invalid username or password");
        })
      )
      .toPromise();
  }



  register(userData: RegisterRequest): Observable<RegisterResponse> {
    const url = `${BASE_URL}register`;

    return this.http.post<RegisterResponse>(url, userData).pipe(
      map(response => {
        if (!response?.id || !response?.username) {
          throw new Error('Invalid registration response');
        }
        return {
          id: response.id,
          username: response.username,
          email: response.email,
          phoneNumber: response.phoneNumber,
          role: response.role
        };
      }),
      catchError(error => {
        let errorMessage = 'Registration failed';
        if (error.status === 400) {
          errorMessage = error.error?.message || 'Invalid registration data';
        } else if (error.status === 409) {
          errorMessage = 'Username or email already exists';
        }

        console.error('Registration error:', error);
        return throwError(() => new Error(errorMessage));
      })
    );
  }






  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1];
      const decoded = atob(payload);
      return JSON.parse(decoded);
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.role || null;
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.sub || null;
    }
    return null;
  }

  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      return decoded?.userId || null;
    }
    return null;
  }


  private redirectUserBasedOnRole(role: string): void {
    // Map JWT roles to routing roles
    if (role === 'ROLE_PROPERTY_OWNER') {
      this.router.navigate(['/property-owner']);
    } else if (role === 'ROLE_CLIENT') {
      this.router.navigate(['/booking-property']);
    } else {
      this.router.navigate(['/']);
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.authState.next(false);
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
