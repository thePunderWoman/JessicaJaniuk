import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';
import { Page } from '../../models/page';

@Injectable()
export class PageService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http, private headerService: HeaderService) {}

  getAll(): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}page`, { headers: this.headerService.createAuthHeaders() });
  }

  getById(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}page/${id}`);
  }

  getByKey(key: string): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}page/key/${key}`);
  }

  save(page: Page): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}page`, page, { headers: this.headerService.createAuthHeaders() });
  }

  update(id: number, page: Page): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}page/${id}`, page, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}page/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
