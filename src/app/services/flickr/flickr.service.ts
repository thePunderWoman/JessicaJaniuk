import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class FlickrService {
  flickrKey = '9a100b5c65faf16b33e3e42c55be6145';
  flickrUser = '116218833@N05';
  flickrURL = 'https://api.flickr.com/services/rest/';
  flickrQuery: string = `?format=json` +
    `&nojsoncallback=1` +
    `&user_id=${this.flickrUser}` +
    `&api_key=${this.flickrKey}` +
    `&method=`;

  constructor(public http: Http) {}

  buildAlbumUrl(): string {
    return `${this.flickrURL}${this.flickrQuery}` +
      `flickr.photosets.getList&primary_photo_extras=url_t,url_s,url_m,url_o,path_alias,media`;
  }

  buildPhotoUrl(albumId: number): string {
    return `${this.flickrURL}${this.flickrQuery}` +
    `flickr.photosets.getPhotos&photoset_id=${albumId}&extras=url_sq,url_t,url_s,url_m,url_o`;
  }

  getAlbums(): Observable<Response> {
    return this.http
      .get(this.buildAlbumUrl());
  }

  getPhotos(albumId: number): Observable<Response> {
    return this.http
      .get(this.buildPhotoUrl(albumId));
  }
}
