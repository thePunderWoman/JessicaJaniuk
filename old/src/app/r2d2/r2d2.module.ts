import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { R2D2RoutingModule } from './r2d2.routing.module';
import { BlogModule } from '../blog/blog.module';
import { AuthGuard } from '../services/auth/auth-guard';
import { MomentModule } from 'angular2-moment';
import { PaginationModule } from '../pagination/pagination.module';
import { PostResolver } from '../blog/blog.post.resolver';

@NgModule({
  imports: [
    CommonModule,
    PaginationModule,
    R2D2RoutingModule,
    BlogModule,
    MomentModule
  ],
  declarations: [],
  providers: [
    AuthGuard,
    PostResolver
  ]
})
export class R2D2Module { }
