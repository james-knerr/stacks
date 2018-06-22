import { Injectable } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { TutorialOverlayComponent } from './tutorial-overlay.component/tutorial-overlay.component';

interface TutorialOverlayConfig {
    panelClass?: string;
    hasBackdrop?: boolean;
    backdropClass?: string;
}

const DEFAULT_CONFIG: TutorialOverlayConfig = {
    hasBackdrop: true,
    backdropClass: 'dark-backdrop',
    panelClass: 'tm-file-preview-dialog-panel'
  };


@Injectable()
export class TutorialOverlayService {

  constructor(private overlay: Overlay) { }

  open(config: TutorialOverlayConfig = {}) {
    // Returns an OverlayRef which is a PortalHost
    const overlayRef = this.overlay.create();

    // Create ComponentPortal that can be attached to a PortalHost
    const tutorialPortal = new ComponentPortal(TutorialOverlayComponent);

    // Attach ComponentPortal to PortalHost
    overlayRef.attach(tutorialPortal);
  }
  private getOverlayConfig(config: TutorialOverlayConfig): OverlayConfig {
    const positionStrategy = this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();

    const overlayConfig = new OverlayConfig({
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      panelClass: config.panelClass,
      scrollStrategy: this.overlay.scrollStrategies.block(),
      positionStrategy
    });

    return overlayConfig;
  }
}
