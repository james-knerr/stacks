import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OverlayModule } from '@angular/cdk/overlay';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TutorialOverlayService } from './tutorial-overlay.service';
import { TutorialOverlayComponent } from './tutorial-overlay.component/tutorial-overlay.component';

@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      FlexLayoutModule,
      OverlayModule
    ],
    declarations: [
        TutorialOverlayComponent
    ],
    providers: [TutorialOverlayService],
    exports: [
        TutorialOverlayComponent
    ],
    entryComponents: [TutorialOverlayComponent]
  })

  export class TutorialModule { }
