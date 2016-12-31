import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logo-header',
  templateUrl: './logo-header.component.html',
  styleUrls: ['./logo-header.component.scss']
})
export class LogoHeaderComponent {
  router: Router;

  constructor(private _router: Router) {
    this.router = _router;
  }

  isNotHome() {
    return this.router.url !== '/';
  }
}
