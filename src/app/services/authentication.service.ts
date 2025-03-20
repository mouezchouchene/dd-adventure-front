import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.apiUrl + "auth/";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private tokenKey = 'jwtToken';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }): Promise<any> {
    const url = BASE_URL + 'login';
    return this.http.post<{ jwt: string }>(url, credentials)
      .pipe(
        map(response => {
          const token = response.jwt;
          if (token) {
            this.saveToken(token);
            const decodedToken = this.decodeToken(token);
            this.redirectUserBasedOnRole(decodedToken.role);
            return decodedToken; // Return decoded token details
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

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private decodeToken(token: string): any {
    try {
      const payload = token.split('.')[1]; // Get payload part of JWT
      const decoded = atob(payload); // Decode base64
      return JSON.parse(decoded); // Parse JSON
    } catch (e) {
      console.error('Error decoding token:', e);
      return null;
    }
  }

  getUserRole(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      console.log("Decoded token role:", decoded?.role);
      return decoded?.role || null; // e.g., "ROLE_PROPERTY_OWNER"
    }
    return null;
  }

  getUserName(): string | null {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      console.log("Decoded token Username:", decoded?.sub);
      return decoded?.sub || null; 
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
    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}