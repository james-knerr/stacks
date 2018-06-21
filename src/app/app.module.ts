import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { CoreModule } from './core.module/core.module';
import { SharedModule } from './shared.module/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppDataService } from './app-data.service';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CoreModule.forRoot(),
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule.forRoot(),
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(AppDataService, { passThruUnknownUrl: true }),
    EcoFabSpeedDialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
