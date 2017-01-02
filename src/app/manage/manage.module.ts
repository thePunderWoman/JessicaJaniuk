import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManageComponent } from './manage.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ManageRoutingModule } from './manage.routing.module';

@NgModule({
  imports: [
    CommonModule,
    ManageRoutingModule
  ],
  declarations: [
    ManageComponent,
    AuthenticationComponent
  ]
})
export class ManageModule { }
