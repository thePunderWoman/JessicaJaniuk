import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { BlogRoutingModule } from './blog.routing.module';
import { ListComponent } from './list/list.component';
import { ManageComponent } from './manage/manage.component';
import { AuthGuard } from '../services/auth/auth-guard';

@NgModule({
  imports: [
    CommonModule,
    BlogRoutingModule
  ],
  declarations: [
    BlogComponent,
    ListComponent,
    ManageComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class BlogModule { }
