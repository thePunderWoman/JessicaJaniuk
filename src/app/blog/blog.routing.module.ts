import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BlogComponent } from './blog.component';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { AuthGuard } from '../services/auth/auth-guard';

const blogRoutes: Routes = [
  {
    path: 'blog',
    component: BlogComponent,
    children: [
      {
        path: '',
        component: ListComponent
      },
      {
        path: 'manage',
        component: ManageComponent,
        canActivate: [
          AuthGuard
        ]
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(blogRoutes)
  ],
  exports: [ RouterModule ]
})

export class BlogRoutingModule { }
