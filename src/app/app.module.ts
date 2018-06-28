import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { Ng2CacheModule } from 'ng2-cache';

import { CoreModule } from './core.module/core.module';
import { SharedModule } from './shared.module/shared.module';
import { AppRoutingModule } from './app-routing.module';

import { AppDataService } from './app-data.service';
import { LoginService } from './login.module/login.service';

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
    Ng2CacheModule
  ],
  providers: [LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
