import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public username: string;
  public password: string;

  constructor(private authService: AuthService, private storageService: StorageService) {
    this.onAuthenticate = this.onAuthenticate.bind(this);
  }

  isLoggedIn() {
    return this.storageService.get('token') !== null;
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.authenticate(this.username, this.password)
    .subscribe(this.onAuthenticate);
  }

  onAuthenticate(data) {
    if (data.ok) {
      let body = JSON.parse(data._body);
      this.storageService.set('user', JSON.stringify(body.user));
      this.storageService.set('token', body.token);
    }
  }
}
