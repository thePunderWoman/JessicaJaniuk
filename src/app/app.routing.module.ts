import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './notfound/notfound.component';

const routes: Routes = [
  { path: '404', component: NotFoundComponent },
  { path: '**', redirectTo: '/404' },
  { path: '', loadChildren: 'app/public/public.module#PublicModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
