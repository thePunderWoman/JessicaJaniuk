import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { FlickrService } from '../services/flickr/flickr.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AlbumResolver implements Resolve<any> {
  constructor(private flickrService: FlickrService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response>|Promise<any>|any {
    return this.flickrService.getPhotos(route.params.id);
  }
}
