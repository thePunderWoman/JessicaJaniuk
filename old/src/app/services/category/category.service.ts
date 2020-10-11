import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';
import { Category } from '../../models/category';

@Injectable()
export class CategoryService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http, private headerService: HeaderService) {}

  getAll(): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}category`);
  }

  getById(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}category/${id}`);
  }

  save(category: Category): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}category`, category, { headers: this.headerService.createAuthHeaders() });
  }

  update(id: number, category: Category): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}category/${id}`, category, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}category/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
