import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CookieService } from 'ngx-cookie';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  public username: string;
  public password: string;
  public domain: string = environment.domain;
  public secureCookie: boolean = environment.production;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router) {
    this.onAuthenticate = this.onAuthenticate.bind(this);
  }

  isLoggedIn() {
    return this.cookieService.get('token') && this.cookieService.get('user');
  }

  logout() {
    this.authService.logout();
  }

  login() {
    this.authService.authenticate(this.username, this.password)
    .subscribe(this.onAuthenticate);
  }

  onAuthenticate(data) {
    const response = data.json();
    if (data.ok && !response.error) {
      const tokenData = { token: response.token, expires: response.expires };
      const options = { path: '/', domain: this.domain, expires: response.expires, secure: this.secureCookie};
      console.log(options);
      this.cookieService.put(
        'user',
        JSON.stringify(response.user),
        options
      );
      this.cookieService.put(
        'token',
        JSON.stringify(tokenData),
        options
      );
      this.router.navigate(['/manage']);
    }
  }
}
