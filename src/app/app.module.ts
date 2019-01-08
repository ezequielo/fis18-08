import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.routing';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { CreditsComponent } from './credits/credits.component';
import { EditableCreditsComponent } from './editable-credits/editable-credits.component';
import { NewCreditComponent } from './new-credit/new-credit.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { DetailCreditComponent } from './detail-credit/detail-credit.component';
import { ProjectInfoComponent } from './project-info/project-info.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    EditableCreditsComponent,
    NewCreditComponent,
    AboutComponent,
    LoginComponent,
    NavBarComponent,
    DetailCreditComponent,
    ProjectInfoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
