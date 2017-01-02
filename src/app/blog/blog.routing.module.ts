import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';

const blogRoutes: Routes = [
  {
    path: '',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ListComponent
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
