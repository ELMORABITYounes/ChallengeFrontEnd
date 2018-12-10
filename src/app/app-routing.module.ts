import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ShopsComponent} from './shops/shops.component';
import {AuthGuardService} from './services/auth-guard.service';
import {LikedShopsComponent} from './liked-shops/liked-shops.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"shops",component:ShopsComponent,canActivate:[AuthGuardService]},
  {path:"liked-shops",component:LikedShopsComponent,canActivate:[AuthGuardService]},
  {path:"**",redirectTo:"login"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
