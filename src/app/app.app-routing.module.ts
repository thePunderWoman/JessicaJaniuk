import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }        from './home/home.component';
import { AboutComponent }       from './about/about.component';
import { ConnectComponent }     from './connect/connect.component';
import { R2d2Component }     from './r2d2/r2d2.component';
import { NotFoundComponent }    from './notfound/notfound.component';
import { AuthenticationComponent }    from './authentication/authentication.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'connect', component: ConnectComponent },
  { path: 'r2d2', component: R2d2Component },
  { path: '404', component: NotFoundComponent },
  { path: 'auth', component: AuthenticationComponent },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
