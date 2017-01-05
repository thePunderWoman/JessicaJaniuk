import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PhotographyComponent } from './photography.component';
import { AlbumComponent } from './album/album.component';
import { AlbumListComponent } from './album-list/album-list.component';

const photographyRoutes: Routes = [
  {
    path: '',
    component: PhotographyComponent,
    children: [
      {
        path: '',
        component: AlbumListComponent
      },
      {
        path: 'album/:id',
        component: AlbumComponent
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(photographyRoutes)
  ],
  exports: [ RouterModule ]
})

export class PhotographyRoutingModule { }
