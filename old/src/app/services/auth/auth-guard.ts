import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { AuthService } from './auth.service';
import { User } from '../../models/user';
import jwt_decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  decode = jwt_decode;

  constructor(private cookieService: CookieService, private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const token = this.retrieveToken();
    const user = this.retrieveUser(token);
    if (token && user && user.isAdmin) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/auth']);
    return false;
  }

  canActivateChild(): boolean {
    const token = this.retrieveToken();
    const user = this.retrieveUser(token);
    if (token && user && user.isAdmin) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/auth']);
    return false;
  }

  retrieveUser(token: string): User {
    if (token) {
      return this.decode(token) as User;
    }
    return null;
  }

  retrieveToken(): any {
    const token = this.cookieService.get('token');
    return (token) ? token : null;
  }
}
