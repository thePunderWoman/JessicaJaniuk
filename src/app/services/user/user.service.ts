import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';

@Injectable()
export class UserService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http, private headerService: HeaderService) {}

  getAll(): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}user`, { headers: this.headerService.createAuthHeaders() });
  }

  getUser(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}user/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}user/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
