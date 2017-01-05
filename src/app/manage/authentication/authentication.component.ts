import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss']
})
export class AuthenticationComponent {
  constructor(public af: AngularFire, private authService: AuthService) {
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  login() {
    this.af.auth.login();
  }

  logout() {
    this.authService.logout();
  }
}
