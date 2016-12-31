import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing.module';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  declarations: [BlogComponent]
})
export class BlogModule { }
