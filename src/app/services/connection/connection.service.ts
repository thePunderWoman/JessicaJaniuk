import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';
import { Connection } from '../../models/connection';

@Injectable()
export class ConnectionService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http, private headerService: HeaderService) {}

  getAll(): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}connection`, { headers: this.headerService.createAuthHeaders() });
  }

  getById(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}connection/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

  save(connection: Connection): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}connection`, connection, { headers: this.headerService.createAuthHeaders() });
  }

  update(id: number, connection: Connection): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}connection/${id}`, connection, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}connection/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
