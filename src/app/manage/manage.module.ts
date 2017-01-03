import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ManageRoutingModule } from './manage.routing.module';
import { ManageNavigationComponent } from './navigation/navigation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BlogComponent } from './blog/blog.component';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import { SimpleTinyComponent } from './simple-tiny/simple-tiny.component';
import { DatepickerModule } from 'angular2-material-datepicker';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    DatepickerModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ManageComponent,
    AuthenticationComponent,
    ManageNavigationComponent,
    DashboardComponent,
    BlogComponent,
    PostFormComponent,
    SimpleTinyComponent,
  ]
})
export class ManageModule { }
