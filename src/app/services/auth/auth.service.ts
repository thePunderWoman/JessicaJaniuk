import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { AngularFire } from 'angularfire2';

@Injectable()
export class AuthService {
  public user: User;

  constructor(private af: AngularFire) {
    this.determineAuthed = this.determineAuthed.bind(this);
    this.af.auth.subscribe(this.determineAuthed);
  }

  isLoggedIn(): boolean {
    return this.user !== undefined;
  }

  isAdmin(): boolean {
    return this.isLoggedIn() && this.user.isAdmin;
  }

  determineAuthed(data): void {
    if (!data) {
      this.user = undefined;
      return;
    }

    if (!this.user && data && data.google) {
      this.user =
        new User(this.af,
          data.google.displayName,
          data.google.email,
          data.google.photoURL,
          data.google.providerId,
          data.google.uid,
          data.uid);
    }
  }
}
