import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'post/:year/:month/:day/:key',
        component: DetailComponent
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
