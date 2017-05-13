import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from '../blog/blog.component';
import { ListComponent } from '../blog/list/list.component';
import { DetailComponent } from '../blog/detail/detail.component';
import { PostResolver } from '../blog/blog.post.resolver';

const r2d2Routes: Routes = [
  {
    path: 'r2d2',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'R2-D2',
          category: 'r2-d2'
        }
      },
      {
        path: 'post/:year/:month/:day/:key',
        component: DetailComponent,
        resolve: {
          post: PostResolver
        }
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(r2d2Routes)
  ],
  exports: [ RouterModule ]
})

export class R2D2RoutingModule { }
