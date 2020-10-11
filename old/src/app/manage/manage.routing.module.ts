import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth/auth-guard';

import { AuthenticationComponent }    from './authentication/authentication.component';
import { ManageComponent } from './manage.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { PagesComponent } from './pages/pages.component';
import { PostFormComponent } from './post-form/post-form.component';
import { PageFormComponent } from './page-form/page-form.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ConnectionsComponent } from './connections/connections.component';
import { ConnectionFormComponent } from './connection-form/connection-form.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryFormComponent } from './category-form/category-form.component';

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
      { path: 'blog/:page', component: BlogComponent },
      { path: 'blog/post/add', component: PostFormComponent },
      { path: 'blog/edit/:id', component: PostFormComponent },
      { path: 'pages', component: PagesComponent },
      { path: 'pages/add', component: PageFormComponent },
      { path: 'pages/edit/:id', component: PageFormComponent },
      { path: 'users', component: UsersComponent },
      { path: 'users/add', component: UserFormComponent },
      { path: 'users/edit/:id', component: UserFormComponent },
      { path: 'connections', component: ConnectionsComponent },
      { path: 'connections/add', component: ConnectionFormComponent },
      { path: 'connections/edit/:id', component: ConnectionFormComponent },
      { path: 'categories', component: CategoriesComponent },
      { path: 'categories/add', component: CategoryFormComponent },
      { path: 'categories/edit/:id', component: CategoryFormComponent },
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
