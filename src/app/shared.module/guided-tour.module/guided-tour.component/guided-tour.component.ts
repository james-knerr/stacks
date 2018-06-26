import {
    Component,
    Input,
    OnChanges,
    SimpleChange,
    Output,
    EventEmitter
} from '@angular/core';
import {
    GuidedTourConfig,
    RelativePosition,
    GuidedTourStep,
    GuidedTourStepPosition
  } from '../guided-tour.models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'guided-tour',
  templateUrl: './guided-tour.component.html',
  styleUrls: ['./guided-tour.component.scss']
})
export class GuidedTourComponent implements OnChanges {
  @Input() public config: GuidedTourConfig;
  @Input() public isVisible: boolean;

  @Output() nextClick = new EventEmitter<number>();
  @Output() previousClick = new EventEmitter<number>();
  @Output() finishClick = new EventEmitter();

  public currentStep: number;
  public currentStepPosition: GuidedTourStepPosition;
  public arrowAbsoluteRight: string;
  public arrowAbsoluteLeft: string;
  public arrowAbsoluteTop: string;
  public arrowAbsoluteBottom: string;

  public stepAbsoluteRight: string;
  public stepAbsoluteLeft: string;
  public stepAbsoluteTop: string;
  public stepAbsoluteBottom: string;

  constructor() {}

  ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
    for (const propName in changes) {
      if (propName === 'isVisible') {
          if (this.isVisible) {
            this.currentStep = 1;
            this.currentStepPosition = this.config.steps[this.currentStep - 1].overlayPosition;
            this.calculateStepPosition();
            this.calculateArrowPosition();
            this.highlightCurrentStepReferenceElement();
            this.resetPreviousStepReferenceElement();
          }
        break;
      }
    }
  }

  public highlightCurrentStepReferenceElement() {

  }

  public resetPreviousStepReferenceElement() {

}

  public calculateStepPosition() {
    const relativeElement = document.getElementById(this.currentStepPosition.referenceElementId);
    const relativeElementPosition = relativeElement.getBoundingClientRect();
    const overlayElement = document.getElementById('overlay');
    switch (this.currentStepPosition.positionRelativeToReferenceElement) {
        case RelativePosition.left: {
            this.stepAbsoluteLeft = (relativeElementPosition.left - overlayElement.clientWidth - 75).toString() + 'px';
            this.stepAbsoluteRight = 'auto';
            if ((relativeElementPosition.top + overlayElement.clientHeight) > window.innerHeight) {
                this.stepAbsoluteTop = (window.innerHeight - overlayElement.clientHeight - 20).toString() + 'px';
            } else {
                this.stepAbsoluteTop = (relativeElementPosition.top).toString() + 'px';
            }
            this.stepAbsoluteBottom = 'auto';
            break;
        }
        case RelativePosition.right: {
            this.stepAbsoluteLeft = ((relativeElementPosition.right > 0 ? relativeElementPosition.right : relativeElement.clientWidth) + 75).toString() + 'px';
            this.stepAbsoluteRight = 'auto';
            this.stepAbsoluteTop = (relativeElementPosition.top).toString() + 'px';
            this.stepAbsoluteBottom = 'auto';
            break;
        }
        case RelativePosition.above: {
            break;
        }
        case RelativePosition.below: {
            break;
        }
    }
  }

  public calculateArrowPosition() {

  }

  public nextStep() {
    if (this.currentStep !== this.config.steps.length) {
    this.currentStep ++;
    this.currentStepPosition = this.config.steps[this.currentStep - 1].overlayPosition;
    this.calculateStepPosition();
    this.calculateArrowPosition();
    this.highlightCurrentStepReferenceElement();
    this.resetPreviousStepReferenceElement();
    this.nextClick.emit(this.currentStep);
    } else {
        this.finishClick.emit();
    }
  }

  public prevStep() {
    this.currentStep --;
    this.currentStepPosition = this.config.steps[this.currentStep - 1].overlayPosition;
    this.calculateStepPosition();
    this.calculateArrowPosition();
    this.highlightCurrentStepReferenceElement();
    this.resetPreviousStepReferenceElement();
    this.previousClick.emit(this.currentStep);
  }

  public isCurrentRelativePosition(position: string): boolean {
    return this.config.steps.find(k => k.stepNumber === this.currentStep)
      .overlayPosition.positionRelativeToReferenceElement.toString() === position;
}
  public getCurrentStepText(): string {
    return this.config.steps.find(k => k.stepNumber === this.currentStep).text;
}

}
