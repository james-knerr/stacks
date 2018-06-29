import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CacheService } from 'ng2-cache';
import { LoginModule } from '../login.module/login.module';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './services/auth-guard.service';
import { ConfigurationService } from './services/configuration.service';
import { ErrorHandlerService } from './services/error-handler.service';
import { AccountService } from './services/account.service';
import { SnackBarService } from './services/snackbar.service';


@NgModule({
  imports: [
    LoginModule
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuardService,
    CacheService,
    SnackBarService,
    ConfigurationService,
    ErrorHandlerService,
    AccountService
  ]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        AuthService,
        AuthGuardService,
        CacheService,
        SnackBarService,
        ConfigurationService,
        ErrorHandlerService,
        AccountService
      ]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
