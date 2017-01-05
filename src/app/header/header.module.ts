import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [
    HeaderComponent,
    LogoComponent
  ],
  exports: [
    HeaderComponent,
    LogoComponent
  ]
})
export class HeaderModule { }
