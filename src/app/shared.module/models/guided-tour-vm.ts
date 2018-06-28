export interface GuidedTourConfig {
    arrowColor: string;
    borderColor: string;
    steps: GuidedTourStep[];
  }

export interface GuidedTourStep {
    // on next event
    stepNumber: number;
    text: string;
    overlayPosition: GuidedTourStepPosition;
}

export interface GuidedTourStepPosition {
    referenceElementId: string;
    positionRelativeToReferenceElement: RelativePosition; // 'left', 'right', 'below', 'above'
}

export enum RelativePosition {
    right = 0,
    left = 1,
    above = 2,
    below = 3
}
