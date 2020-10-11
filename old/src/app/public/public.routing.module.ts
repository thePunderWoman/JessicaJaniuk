import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';
import { HomeComponent } from '../home/home.component';
import { AboutComponent } from '../about/about.component';
import { ConnectComponent } from '../connect/connect.component';
import { PageResolver } from '../page/page.resolver';

const publicRoutes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'about',
        component: AboutComponent,
        data: {
          key: 'aboutme'
        },
        resolve: {
          page: PageResolver
        }
      },
      {
        path: 'connect',
        component: ConnectComponent,
        data: {
          key: 'connect'
        },
        resolve: {
          page: PageResolver
        }
      },
      { path: '', loadChildren: 'app/r2d2/r2d2.module#R2D2Module' },
      { path: '', loadChildren: 'app/blog/blog.module#BlogModule' },
      { path: '', loadChildren: 'app/photography/photography.module#PhotographyModule' }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(publicRoutes)
  ],
  exports: [ RouterModule ]
})

export class PublicRoutingModule { }
