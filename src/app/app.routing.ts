import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreditsComponent } from './credits/credits.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NeedAuthService } from './need-auth.service';



const routes: Routes = [
  {path: '', redirectTo: 'credits', pathMatch: 'full', canActivate: [NeedAuthService]},
  {path: 'credits', component: CreditsComponent, canActivate: [NeedAuthService]},
  {path: 'new', component: NewCreditComponent, canActivate: [NeedAuthService]},
  {path: 'login', component: LoginComponent},
  {path: 'about', component: AboutComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule {
}

