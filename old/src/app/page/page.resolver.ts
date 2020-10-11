import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { PageService } from '../services/page/page.service';
import { Page } from '../models/page';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PageResolver implements Resolve<Page> {
  constructor(private pageService: PageService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Response>|Promise<Page>|any {
    return this.pageService.getByKey(route.data.key);
  }
}
