import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  router: Router;

  constructor(private _router: Router) {
    this.router = _router;
  }

  isNotHome() {
    return this.router.url !== '/';
  }
}
