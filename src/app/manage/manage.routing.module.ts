import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthenticationComponent }    from './authentication/authentication.component';
import { ManageComponent } from './manage.component';
import { AuthGuard } from '../services/auth/auth-guard';

const manageRoutes: Routes = [
  { path: 'auth', component: AuthenticationComponent },
  {
    path: 'manage',
    component: ManageComponent,
    canActivate: [
      AuthGuard
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
