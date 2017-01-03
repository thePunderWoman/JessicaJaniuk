import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth-guard';

import { AuthenticationComponent }    from './authentication/authentication.component';
import { ManageComponent } from './manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { PostFormComponent } from './post-form/post-form.component';

const manageRoutes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [
      AuthGuard
    ],
    canActivateChild: [
      AuthGuard
    ],
    children: [
      { path: '', component: DashboardComponent },
      { path: 'blog', component: BlogComponent },
      { path: 'blog/add', component: PostFormComponent },
      { path: 'blog/edit/:id', component: PostFormComponent }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(manageRoutes)
  ],
  exports: [ RouterModule ]
})

export class ManageRoutingModule { }
