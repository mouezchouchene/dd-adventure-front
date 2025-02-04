import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.rootUrl + "/";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private userKey = 'loggedInUser';

  constructor(private http: HttpClient , private router : Router ) { }

  login(credentials: any): Promise<any> {
    const url = BASE_URL + 'users';
    return this.http.get(url)
      .pipe(
        map((users: any) => {
          const foundUser = users.find((user:any) => 
            user.username === credentials.username &&
            user.password === credentials.password);
          if (foundUser) {
            this.saveUser({ username: foundUser.username, role: foundUser.role });
            this.redirectUserBasedOnRole(foundUser.role);

            return foundUser; 
          } else {
            throw "Invalid username or password"; 
          }
        }),
        catchError((error: any) => {
          throw error;
        })
      )
      .toPromise();
  }

  private redirectUserBasedOnRole(role: string): void {
    if (role === 'property-owner') {
      this.router.navigate(['/property-owner']);
    } else if (role === 'booking-property') {
      this.router.navigate(['/booking-property']);
    } else {
      this.router.navigate(['/']);
    }
  }

  saveUser(user: any): void {
    localStorage.setItem(this.userKey, JSON.stringify(user));
  }

  getUser(): any {
    const userStr = localStorage.getItem(this.userKey);
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getUserRole(): string | null {
    const user = this.getUser();
    console.log("user role => ",user.role);
    
    return user ? user.role : null;
  }

  logout(): void {
    localStorage.removeItem(this.userKey);

    this.router.navigate(['/']);
  }

  isLoggedIn(): boolean {
    return !!this.getUser();
  }

}
