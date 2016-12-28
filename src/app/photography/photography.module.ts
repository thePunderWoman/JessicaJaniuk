import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotographyComponent } from './photography.component';
import { AlbumComponent } from './album/album.component';
import { PhotographyRoutingModule } from './photography.routing.module';
import { AlbumListComponent } from './album-list/album-list.component';

@NgModule({
  imports: [
    CommonModule,
    PhotographyRoutingModule
  ],
  declarations: [
    PhotographyComponent,
    AlbumComponent,
    AlbumListComponent
  ]
})
export class PhotographyModule { }
