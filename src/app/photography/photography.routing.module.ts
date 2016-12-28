import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotographyComponent } from './photography.component';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';

const photographyRoutes: Routes = [
  {
    path: '',
    redirectTo: 'photography',
    pathMatch: 'full'
  },
  {
    path: 'photography',
    component: PhotographyComponent,
    children: [
      {
        path: '',
        component: AlbumListComponent
      },
      {
        path: ':id',
        component: AlbumComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(photographyRoutes)
  ],
  exports: [ RouterModule ]
})

export class PhotographyRoutingModule { }
