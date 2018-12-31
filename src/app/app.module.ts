import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CreditsComponent } from './credits/credits.component';
import { EditableCreditsComponent } from './editable-credits/editable-credits.component';

@NgModule({
  declarations: [
    AppComponent,
    CreditsComponent,
    EditableCreditsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
