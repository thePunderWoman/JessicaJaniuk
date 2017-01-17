import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';
import { User } from '../../models/user';

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

  saveUser(user: User): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}user`, user, { headers: this.headerService.createAuthHeaders() });
  }

  updateUser(id: number, user: User): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}user/${id}`, user, { headers: this.headerService.createAuthHeaders() });
  }

  setPassword(id: number, password: string): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}user/${id}/password`, { password: password }, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}user/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
