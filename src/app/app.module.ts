import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app.routing.module';
import { MomentModule } from 'angular2-moment';
import 'hammerjs';

import { AppComponent } from './app.component';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';

import { NotFoundComponent }    from './notfound/notfound.component';

import { HeaderModule }    from './header/header.module';
import { ManageModule }    from './manage/manage.module';
import { PublicModule }    from './public/public.module';

import { FlickrService } from './services/flickr/flickr.service';
import { TitleService } from './services/title/title.service';
import { AuthService } from './services/auth/auth.service';
import { StorageService } from './services/storage/storage.service';
import { UserService } from './services/user/user.service';
import { HeaderService } from './services/header/header.service';

export const firebaseConfig = {
  apiKey: 'AIzaSyDEj0wEUEV9JVj9WRPPQxhVRzRTuuggLAs',
  authDomain: 'jessicajaniuk.com',
  databaseURL: 'https://resplendent-inferno-2474.firebaseio.com',
  storageBucket: 'resplendent-inferno-2474.appspot.com',
  messagingSenderId: '546916458455'
};

export const myFirebaseAuthConfig = {
  provider: AuthProviders.Google,
  method: AuthMethods.Popup,
  remember: 'default',
  scope: ['email', 'profile']
};

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HeaderModule,
    ManageModule,
    PublicModule,
    AppRoutingModule,
    MomentModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig)
  ],
  providers: [
    FlickrService,
    TitleService,
    AuthService,
    StorageService,
    UserService,
    HeaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
