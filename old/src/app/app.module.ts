import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app.routing.module';
import { MomentModule } from 'angular2-moment';
import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound/notfound.component';

import { HeaderModule } from './header/header.module';
import { ManageModule } from './manage/manage.module';
import { PublicModule } from './public/public.module';

import { FlickrService } from './services/flickr/flickr.service';
import { MetaService } from './services/meta/meta.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { PageService } from './services/page/page.service';
import { ConnectionService } from './services/connection/connection.service';
import { PostService } from './services/post/post.service';
import { CategoryService } from './services/category/category.service';
import { HeaderService } from './services/header/header.service';
import { FullUrlService } from './services/fullUrl/fullUrl.service';
import { PageResolver } from './page/page.resolver';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';

export { AppComponent, NotFoundComponent };

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    MaterialModule,
    BrowserModule.withServerTransition({appId: 'jessica-janiuk'}),
    FormsModule,
    HttpModule,
    HeaderModule,
    ManageModule,
    PublicModule,
    AppRoutingModule,
    MomentModule,
    CookieModule.forRoot()
  ],
  providers: [
    FlickrService,
    MetaService,
    AuthService,
    UserService,
    PageService,
    HeaderService,
    ConnectionService,
    PostService,
    CategoryService,
    FullUrlService,
    PageResolver
  ],
  bootstrap: [AppComponent],
  exports: [
    AppComponent,
    NotFoundComponent,
  ],
})
export class AppModule { }
