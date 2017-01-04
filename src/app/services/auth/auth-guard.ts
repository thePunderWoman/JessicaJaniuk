import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild } from '@angular/router';
import { StorageService } from '../storage/storage.service';
import { User } from '../../models/user';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private storageService: StorageService) {}

  canActivate(): boolean {
    let user = this.retrieveUser();
    return user.isAdmin;
  }

  canActivateChild(): boolean {
    let user = this.retrieveUser();
    return user.isAdmin;
  }

  retrieveUser(): User {
    let userString = this.storageService.get('user');
    if (userString) {
      let user: User = JSON.parse(userString) as User;
      return user;
    }
    return null;
  }
}
