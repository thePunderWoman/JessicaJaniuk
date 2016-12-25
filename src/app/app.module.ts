import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { LogoHeaderComponent } from './logo-header/logo-header.component';
import { AboutComponent } from './about/about.component';
import { AngularFireModule } from 'angularfire2';
import 'hammerjs';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent }
];

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
    HomeComponent,
    LogoHeaderComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    MaterialModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
