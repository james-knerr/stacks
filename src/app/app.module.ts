import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';


import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CoreModule } from './core.module/core.module';
import { AppRoutingModule } from './app-routing.module';

import { AppDataService } from './app-data.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AppDataService, { passThruUnknownUrl: true }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
