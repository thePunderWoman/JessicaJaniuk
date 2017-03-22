import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { StorageService } from '../storage/storage.service';
import { environment } from '../../../environments/environment';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  apiBaseUrl: string = environment.apiUrl;
  public user: User;

  constructor(private storageService: StorageService, private http: Http) {
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
    const userString = this.storageService.get('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
    }
  }

  logout(): void {
   this.storageService.remove('token');
   this.storageService.remove('user');
 }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  isAdmin(): boolean {
    return this.user && this.user.isAdmin;
  }
}
