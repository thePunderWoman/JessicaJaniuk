import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public username: string;
  public password: string;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) {
    this.onAuthenticate = this.onAuthenticate.bind(this);
  }

  isLoggedIn() {
    return this.storageService.get('token') && this.storageService.get('user');
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.authenticate(this.username, this.password)
    .subscribe(this.onAuthenticate);
  }

  onAuthenticate(data) {
    let response = data.json();
    if (data.ok && !response.error) {
      let tokenData = { token: response.token, expires: response.expires };
      this.storageService.set('user', JSON.stringify(response.user));
      this.storageService.set('token', JSON.stringify(tokenData));
      this.router.navigate(['/manage']);
    }
  }
}
