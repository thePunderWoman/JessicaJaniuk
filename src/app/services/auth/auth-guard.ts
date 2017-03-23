import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { AuthService } from './auth.service';
import { User } from '../../models/user';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const user = this.retrieveUser();
    const tokenData = this.retrieveToken();
    if (user && user.isAdmin && tokenData && tokenData.token && Date.now() <= new Date(tokenData.expires).getTime()) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/auth']);
    return false;
  }

  canActivateChild(): boolean {
    const user = this.retrieveUser();
    const tokenData = this.retrieveToken();
    if (user && user.isAdmin && tokenData && tokenData.token && Date.now() <= new Date(tokenData.expires).getTime()) {
      return true;
    }
    this.authService.logout();
    this.router.navigate(['/auth']);
    return false;
  }

  retrieveUser(): User {
    const userString = this.storageService.get('user');
    if (userString) {
      const user: User = JSON.parse(userString) as User;
      return user;
    }
    return null;
  }

  retrieveToken(): any {
    const tokenString = this.storageService.get('token');
    if (tokenString) {
      const tokenData = JSON.parse(tokenString);
      return tokenData;
    }
    return null;
  }
}
