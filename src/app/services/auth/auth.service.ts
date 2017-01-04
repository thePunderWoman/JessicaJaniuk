import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFire } from 'angularfire2';
import { StorageService } from '../storage/storage.service';

@Injectable()
export class AuthService {
  public user: User;

  constructor(private af: AngularFire, private storageService: StorageService) {
    this.determineAuthed = this.determineAuthed.bind(this);
    this.determineAdmin = this.determineAdmin.bind(this);
    this.getUserFromCache();
    this.af.auth.subscribe(this.determineAuthed);
  }

  getUserFromCache() {
    let userString = this.storageService.get('user');
    if (userString) {
      this.user = JSON.parse(userString) as User;
    }
  }

  logout(): void {
   this.af.auth.logout();
   this.storageService.remove('user');
 }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  isAdmin(): boolean {
    return this.user && this.user.isAdmin;
  }

  determineAuthed(data): void {
    if (!data || (data && !data.google)) {
      this.user = undefined;
      this.storageService.remove('user');
      return;
    }

    if (!this.user && data && data.google) {
      this.user =
        new User(data.google.displayName,
          data.google.email,
          data.google.photoURL,
          data.google.providerId,
          data.google.uid,
          data.uid);
      this.af.database.object(`/users/${data.uid}`).subscribe(this.determineAdmin);
    }
  }

  determineAdmin(user): void {
    this.user.isAdmin = user && user.level === 100;
    this.cacheUser();
  }

  cacheUser(): void {
    this.storageService.set('user', JSON.stringify(this.user));
  }
}
