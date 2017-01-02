import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent }        from './public.component';
import { HomeComponent }        from '../home/home.component';
import { AboutComponent }       from '../about/about.component';
import { ConnectComponent }     from '../connect/connect.component';
import { R2d2Component }     from '../r2d2/r2d2.component';

const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      { path: 'about', component: AboutComponent },
      { path: 'connect', component: ConnectComponent },
      { path: 'r2d2', component: R2d2Component },
      { path: 'blog', loadChildren: 'app/blog/blog.module#BlogModule' },
      { path: 'photography', loadChildren: 'app/photography/photography.module#PhotographyModule' }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(publicRoutes)
  ],
  exports: [ RouterModule ]
})

export class PublicRoutingModule { }
