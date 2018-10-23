import { Routes, RouterModule } from '@angular/router';

import { LoginSuccessComponent } from './login-success/login-success.component';
import { LoginComponent } from './login/login.component';
import {HomeComponent} from "./home/home.component";
import {AuthGuard} from "./auth.guard";

const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate:[AuthGuard]},
  { path: 'login', component: LoginComponent },
  { path: 'loginSuccess', component: LoginSuccessComponent},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
