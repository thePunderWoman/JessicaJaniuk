import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';
import { PostResolver } from './blog.post.resolver';

const blogRoutes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {
          title: 'Blog',
          category: 'personal'
        }
      },
      {
        path: ':page',
        component: ListComponent,
        data: {
          title: 'Blog',
          category: 'personal'
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
    RouterModule.forChild(blogRoutes)
  ],
  exports: [ RouterModule ]
})

export class BlogRoutingModule { }
