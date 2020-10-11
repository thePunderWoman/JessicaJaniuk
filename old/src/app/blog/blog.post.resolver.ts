import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PostService } from '../services/post/post.service';
import { Post } from '../models/post';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PostResolver implements Resolve<Post> {
  constructor(private postService: PostService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response>|Promise<Post>|any {
    return this.postService.getByKeyAndDate(route.params.year, route.params.month, route.params.day, route.params.key);
  }
}
