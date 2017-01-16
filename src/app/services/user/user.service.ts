import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';

@Injectable()
export class UserService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http) {}

  getAll(): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}user`);
  }

  getUser(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}user/${id}`);
  }
}
