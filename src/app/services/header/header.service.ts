import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { CookieService } from 'ngx-cookie';

@Injectable()
export class HeaderService {
  constructor(private cookieService: CookieService) {}

  createAuthHeaders(): Headers {
    const headers = new Headers();
    const token = this.cookieService.get('token');
    headers.append('Authorization', `Bearer ${token}`);
    return headers;
  }
}
