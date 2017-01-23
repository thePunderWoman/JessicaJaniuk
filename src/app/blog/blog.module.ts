import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing.module';
import { ListComponent } from './list/list.component';
import { AuthGuard } from '../services/auth/auth-guard';
import { MomentModule } from 'angular2-moment';
import { DetailComponent } from './detail/detail.component';
import { PaginationModule } from '../pagination/pagination.module';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule,
    MomentModule,
    PaginationModule
  ],
  declarations: [
    BlogComponent,
    ListComponent,
    DetailComponent,
  ],
  providers: [
    AuthGuard
  ]
})
export class BlogModule { }
