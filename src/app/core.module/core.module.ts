import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import {
  MatSnackBarModule,
  MatSnackBar
} from '@angular/material';

import { SnackBarService } from './services/snackbar.service';

@NgModule({
  imports: [MatSnackBarModule],
  declarations: [],
  providers: [MatSnackBar, SnackBarService]
})
export class CoreModule {

  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [MatSnackBar, SnackBarService]
    };
  }

  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
