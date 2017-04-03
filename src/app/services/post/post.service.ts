import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../../environments/environment';
import { HeaderService } from '../header/header.service';
import { Post } from '../../models/post';

@Injectable()
export class PostService {
  apiBaseUrl: string = environment.apiUrl;

  constructor(public http: Http, private headerService: HeaderService) {}

  getAll(page: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}post?page=${page}`, { headers: this.headerService.createAuthHeaders() });
  }

  getAllPublished(page: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}post/published?page=${page}`);
  }

  getAllPublishedByCategory(category: string, page: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}post/category/${category}?page=${page}`);
  }

  getById(id: number): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}post/${id}`);
  }

  getByKeyAndDate(year: number, month: number, day: number, key: string): Observable<Response> {
    return this.http
      .get(`${this.apiBaseUrl}post/${year}/${month}/${day}/${key}`);
  }

  save(post: Post): Observable<Response> {
    return this.http
      .post(`${this.apiBaseUrl}post`, post, { headers: this.headerService.createAuthHeaders() });
  }

  update(id: number, post: Post): Observable<Response> {
    return this.http
      .put(`${this.apiBaseUrl}post/${id}`, post, { headers: this.headerService.createAuthHeaders() });
  }

  remove(id: number): Observable<Response> {
    return this.http
      .delete(`${this.apiBaseUrl}post/${id}`, { headers: this.headerService.createAuthHeaders() });
  }

}
