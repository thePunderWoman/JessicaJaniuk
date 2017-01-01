import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app.app-routing.module';
import 'hammerjs';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { LogoHeaderComponent } from './logo-header/logo-header.component';
import { AngularFireModule } from 'angularfire2';

import { HomeComponent }        from './home/home.component';
import { AboutComponent }       from './about/about.component';
import { ConnectComponent }     from './connect/connect.component';
import { NotFoundComponent }    from './notfound/notfound.component';

import { PhotographyModule }    from './photography/photography.module';
import { BlogModule }    from './blog/blog.module';

import { FlickrService } from './services/flickr/flickr.service';
import { TitleService } from './services/title/title.service';
import { R2d2Component } from './r2d2/r2d2.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyDEj0wEUEV9JVj9WRPPQxhVRzRTuuggLAs',
  authDomain: 'resplendent-inferno-2474.firebaseapp.com',
  databaseURL: 'https://resplendent-inferno-2474.firebaseio.com',
  storageBucket: 'resplendent-inferno-2474.appspot.com',
  messagingSenderId: '546916458455'
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    LogoHeaderComponent,
    HomeComponent,
    AboutComponent,
    ConnectComponent,
    NotFoundComponent,
    R2d2Component
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PhotographyModule,
    BlogModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    FlickrService,
    TitleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
