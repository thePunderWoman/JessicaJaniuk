import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthService {
  apiBaseUrl: string = environment.apiUrl;
  public user: User;
  decode = jwt_decode;

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
    const token = this.cookieService.get('token');
    if (token) {
      this.user = this.decode(token) as User;
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
