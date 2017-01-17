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
import { PagesComponent } from './pages/pages.component';
import { PageFormComponent } from './page-form/page-form.component';
import { TinymceComponent } from './tinymce/tinymce.component';
import { Ng2DatetimePickerModule } from 'ng2-datetime-picker';
import { MomentModule } from 'angular2-moment';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { UsersComponent } from './users/users.component';
import { UserFormComponent } from './user-form/user-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ManageRoutingModule,
    DatepickerModule,
    Ng2DatetimePickerModule,
    MomentModule,
    MaterialModule.forRoot()
  ],
  declarations: [
    ManageComponent,
    AuthenticationComponent,
    ManageNavigationComponent,
    DashboardComponent,
    BlogComponent,
    PostFormComponent,
    PagesComponent,
    PageFormComponent,
    TinymceComponent,
    DeleteDialogComponent,
    UsersComponent,
    UserFormComponent,
  ],
  entryComponents: [
    DeleteDialogComponent
  ]
})
export class ManageModule { }
