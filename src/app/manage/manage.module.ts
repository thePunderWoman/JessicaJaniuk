import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { DatepickerModule } from 'angular2-material-datepicker';
import { QuillModule } from './quill/quill.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    DatepickerModule,
    QuillModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ManageComponent,
    AuthenticationComponent,
    ManageNavigationComponent,
    DashboardComponent,
    BlogComponent,
    PostFormComponent,
  ],
})
export class ManageModule { }
