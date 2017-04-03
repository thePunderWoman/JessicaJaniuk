import { MetaModule, MetaLoader, MetaStaticLoader, PageTitlePositioning } from '@nglibs/meta';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app.routing.module';
import { MomentModule } from 'angular2-moment';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './notfound/notfound.component';

import { HeaderModule } from './header/header.module';
import { ManageModule } from './manage/manage.module';
import { PublicModule } from './public/public.module';

import { FlickrService } from './services/flickr/flickr.service';
import { MetaService } from '@nglibs/meta';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';
import { PageService } from './services/page/page.service';
import { ConnectionService } from './services/connection/connection.service';
import { PostService } from './services/post/post.service';
import { CategoryService } from './services/category/category.service';
import { HeaderService } from './services/header/header.service';
import { FullUrlService } from './services/fullUrl/fullUrl.service';
import { PageResolver } from './page/page.resolver';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    ManageModule,
    PublicModule,
    AppRoutingModule,
    MomentModule,
    MaterialModule.forRoot(),
    MetaModule.forRoot({
      provide: MetaLoader,
      useFactory: (metaFactory)
    })
  ],
  providers: [
    FlickrService,
    MetaService,
    AuthService,
    StorageService,
    UserService,
    PageService,
    HeaderService,
    ConnectionService,
    PostService,
    CategoryService,
    FullUrlService,
    PageResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function metaFactory(): MetaLoader {
  return new MetaStaticLoader({
    pageTitlePositioning: PageTitlePositioning.PrependPageTitle,
    pageTitleSeparator: ' | ',
    applicationName: 'Jessica Janiuk',
    defaults: {
      title: 'Welcome | Jessica Janiuk',
      description: 'Nerdfighter. Developer. Writer. Droid Builder Gamer. Photographer. Historical Fencer. Speaker. Trans. Lesbian. Woman.',
      'og:image': 'https://jessicajaniuk.com/assets/site-image.png',
      'og:type': 'website',
      'og:locale': 'en_US'
    }
  });
}
