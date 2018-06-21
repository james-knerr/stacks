import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { CacheService } from 'ng2-cache';
import { AuthGuardService } from './services/auth-guard.service';
import { SnackBarService } from './services/snackbar.service';
import { LoginModule } from '../login.module/login.module';

@NgModule({
  imports: [
    LoginModule
  ],
  declarations: [],
  providers: [AuthGuardService, CacheService, SnackBarService]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [AuthGuardService, CacheService, SnackBarService]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
