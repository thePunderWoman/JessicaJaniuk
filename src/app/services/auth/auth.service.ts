import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  apiBaseUrl: string = environment.apiUrl;
  public user: User;

  constructor(private cookieService: CookieService, private http: Http) {
    this.getUserFromCache();
  }

  authenticate(username: string, password: string): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}authenticate`, {
        username: username,
        password: password
      });
  }

  getUserFromCache() {
    const userString = this.cookieService.get('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
    }
  }

  logout(): void {
   this.cookieService.removeAll();
 }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  isAdmin(): boolean {
    return this.user && this.user.isAdmin;
  }
}
