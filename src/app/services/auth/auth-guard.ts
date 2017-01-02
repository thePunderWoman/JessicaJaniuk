import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private authService: AuthService) {}

  canActivate() {
    return this.authService.isAdmin();
  }

  canActivateChild() {
    return this.authService.isAdmin();
  }
}
