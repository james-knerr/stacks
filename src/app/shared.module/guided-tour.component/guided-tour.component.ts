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
  } from '../models/guided-tour-vm';

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
          }
        break;
      }
    }
  }
  public calculateStepPosition() {
    const relativeElement = document.getElementById(this.currentStepPosition.referenceElementId);
    const relativeElementPosition = relativeElement.getBoundingClientRect();
    const overlayElement = document.getElementById('overlay');
    switch (this.currentStepPosition.positionRelativeToReferenceElement) {
        case RelativePosition.left: {
            this.stepAbsoluteLeft = 'auto';
            this.stepAbsoluteRight = (window.innerWidth - relativeElementPosition.left + 40).toString() + 'px';
            if (this.currentStep === 3) {
                this.stepAbsoluteTop = (relativeElementPosition.top + 40).toString() + 'px';
            } else {
                this.stepAbsoluteTop = (relativeElementPosition.top).toString() + 'px';
            }
            this.stepAbsoluteBottom = 'auto';
            break;
        }
        case RelativePosition.right: {
            this.stepAbsoluteLeft = ((relativeElementPosition.right > 0 ? relativeElementPosition.right : relativeElement.clientWidth) + 40).toString() + 'px';
            this.stepAbsoluteRight = 'auto';
            this.stepAbsoluteTop = (relativeElementPosition.top + (relativeElement.clientHeight / 2) - 5).toString() + 'px';
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
    const relativeElement = document.getElementById(this.currentStepPosition.referenceElementId);
    const relativeElementPosition = relativeElement.getBoundingClientRect();
    const overlayElement = document.getElementById('overlay');
    switch (this.currentStepPosition.positionRelativeToReferenceElement) {
        case RelativePosition.left: {
            this.arrowAbsoluteRight = (+(this.stepAbsoluteRight.replace('px', '')) - 23).toString() + 'px';
            this.arrowAbsoluteLeft = 'auto';
            this.arrowAbsoluteTop = (+(this.stepAbsoluteTop.replace('px', '')) + 15).toString() + 'px';
            this.arrowAbsoluteBottom = 'auto';
            break;
        }
        case RelativePosition.right: {
            this.arrowAbsoluteLeft = (+(this.stepAbsoluteLeft.replace('px', '')) - 23 ).toString() + 'px';
            this.arrowAbsoluteRight = 'auto';
            this.arrowAbsoluteTop = this.stepAbsoluteTop;
            this.arrowAbsoluteBottom = 'auto';
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

  public nextStep() {
    if (this.currentStep !== this.config.steps.length) {
    this.currentStep ++;
    this.currentStepPosition = this.config.steps[this.currentStep - 1].overlayPosition;
    this.calculateStepPosition();
    this.calculateArrowPosition();
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
    this.previousClick.emit(this.currentStep);
  }

  public isCurrentRelativePosition(position: string): boolean {
      return RelativePosition[this.config.steps[this.currentStep - 1]
      .overlayPosition.positionRelativeToReferenceElement] === position;
}
  public getCurrentStepText(): string {
    return this.config.steps.find(k => k.stepNumber === this.currentStep).text;
}

}
