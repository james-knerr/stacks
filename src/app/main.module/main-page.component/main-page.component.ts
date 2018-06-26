import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { CacheService } from 'ng2-cache';
import { MainService } from '../main.service';
import { LoginService } from '../../login.module/login.service';
import { AddRecordFormComponent } from '../../shared.module/add-record-form.component/add-record-form.component';
import { StackListVM, StackVM } from '../../shared.module/models/stack-vm';
import {
  GuidedTourConfig,
  RelativePosition,
  GuidedTourStep,
  GuidedTourStepPosition
} from '../../shared.module/guided-tour.module/guided-tour.models';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public stacks: StackListVM[];
  public selectedStackId: string;
  public mobileQuery: MediaQueryList;

  public guidedTourConfig: GuidedTourConfig =
  {
    arrowColor: '#76b29d',
    borderColor: '#76b29d',
    steps: [{
      stepNumber: 1,
      text: 'Click here to show or hide the list of stacks',
      overlayPosition: {
        referenceElementId: 'toggleStacksBtn',
        positionRelativeToReferenceElement: RelativePosition.right
      }
    },
    {
      stepNumber: 2,
      text: 'Click on a stack to view the images within it',
      overlayPosition: {
        referenceElementId: 'navList',
        positionRelativeToReferenceElement: RelativePosition.right
      }
    },
    {
      stepNumber: 3,
      text: 'Click here to create a new stack',
      overlayPosition: {
        referenceElementId: 'addStackBtn',
        positionRelativeToReferenceElement: RelativePosition.left
      }
    },
    {
      stepNumber: 4,
      text: 'Click here to add an image to the selected stack',
      overlayPosition: {
        referenceElementId: 'addImageBtn',
        positionRelativeToReferenceElement: RelativePosition.left
      }
    }]
  };

  public tutorialStep = 1;
  public tutorialVisible = false;
  public tutorialStepTop = '0px';
  public tutorialStepLeft = '0px';
  public tutorialStepText = '';
  public showTutorialPreviousBtn = false;
  public tutorialNextBtnText = '';
  public tutorialArrowDirection = '';
  public tutorialArrowLeft = '0px';
  public tutorialArrowTop = '0px';
  public tutorialArrowLeftOffset = 24;
  public tutorialArrowTopOffset = 12;

  private _mobileQueryListener: () => void;

  constructor(
    private _cacheService: CacheService,
    private _loginService: LoginService,
    private _dialog: MatDialog,
    private _mainService: MainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this.getStacks();
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  private getStacks() {
    this._mainService.getStacks().subscribe(k => {
      this.stacks = k;
      this.stackSelected(this.stacks[0].id);
    });
  }

public deleteStack(event: any, stackId: string) {
  event.stopPropagation();
  this.stacks[stackId].isDeleted = true;
  if (this.selectedStackId === stackId) {
    this.selectedStackId = null;
  }
}

public stackSelected(stackId: string) {
  if (this.selectedStackId !== stackId) {
  this.selectedStackId = stackId;
  this._router.navigate(['content/' + stackId], { relativeTo: this._activatedRoute });
  }
}

public isStackSelected(stackId: string): boolean {
    return this.selectedStackId === stackId;
}

public addStack() {

}

public addRecord() {
  const dialogRef = this._dialog.open(AddRecordFormComponent, { disableClose: true });
  dialogRef.componentInstance.setModel(this.selectedStackId);
  dialogRef.afterClosed()
      .subscribe(result => {
          this.handleAddRecordFormClose(result);
      });
}

public handleAddRecordFormClose(result: { event: string, data?: StackVM }) {
  switch (result.event) {
      case 'cancelled':
          // do nothing
          break;
      case 'added':
          // unsure
          break;
      default:
      // throw error
          break;
  }
}

public logout() {
  this._loginService.logout();
  this._cacheService.removeAll();
  this._router.navigate(['auth/sign-in']);
}

public showTutorial() {
  this.tutorialStep = 1;
  this.tutorialVisible = true;
  const tutorialSubject = document.getElementById('toggleStacksBtn');
  const subjectBounds = tutorialSubject.getBoundingClientRect();
  tutorialSubject.parentElement.parentElement.style.zIndex = 'auto';
  const icon = tutorialSubject.children[0].children[0];
  (icon as HTMLElement).style.marginBottom = '4px';
  tutorialSubject.style.zIndex = '1100';
  tutorialSubject.style.border = 'solid 3px #76b29d';
  /* this.tutorialStepTop = (subjectBounds.top + (subjectBounds.height / 2) - (this.tutorialArrowTopOffset * 2)).toString() + 'px';
  this.tutorialStepLeft = (subjectBounds.width + 50).toString() + 'px';
  this.tutorialArrowDirection = 'left';
  this.tutorialArrowLeft = (subjectBounds.width + 50 - this.tutorialArrowLeftOffset).toString() + 'px';
  this.tutorialArrowTop = (subjectBounds.top + (subjectBounds.height / 2) - this.tutorialArrowTopOffset).toString() + 'px';
  this.tutorialStepText = 'Click here to show or hide the list of stacks';
  this.showTutorialPreviousBtn = false;
  this.tutorialNextBtnText = 'NEXT'; */
}

public onNextStep(currentStepNumber: number) {
  this.tutorialStep = currentStepNumber;
  switch (this.tutorialStep) {
    case 2: {
      const previousTutorialSubject = document.getElementById('toggleStacksBtn');
      const previousSubjectBounds = previousTutorialSubject.getBoundingClientRect();
      previousTutorialSubject.parentElement.parentElement.style.zIndex = '10';
      const icon = previousTutorialSubject.children[0].children[0];
      (icon as HTMLElement).style.marginBottom = '0px';
      previousTutorialSubject.style.zIndex = 'auto';
      previousTutorialSubject.style.border = 'none';

      const appSideNav = document.getElementById('appSideNav');
      if (appSideNav.style.visibility === 'hidden') {
        const toggleBtn = document.getElementById('toggleStacksBtn');
        toggleBtn.click();
      }
      const tutorialSubject = document.getElementById('navList');
      const subjectBounds = tutorialSubject.getBoundingClientRect();
      tutorialSubject.parentElement.style.zIndex = '1100';
      tutorialSubject.parentElement.style.border = 'solid 3px #76b29d';
      tutorialSubject.parentElement.parentElement.style.zIndex = 'auto';
      /* this.tutorialStepTop = (subjectBounds.top + (subjectBounds.height / 2) - (this.tutorialArrowTopOffset * 2)).toString() + 'px';
      this.tutorialStepLeft = (subjectBounds.width + 50).toString() + 'px';
      this.tutorialArrowDirection = 'left';
      this.tutorialArrowLeft = (subjectBounds.width + 50 - this.tutorialArrowLeftOffset).toString() + 'px';
      this.tutorialArrowTop = (subjectBounds.top + (subjectBounds.height / 2) - this.tutorialArrowTopOffset).toString() + 'px';
      this.tutorialStep = 2; */
      this.tutorialVisible = true;
      // this.tutorialStepText = 'Click on a stack to view the images within it';
      // this.showTutorialPreviousBtn = true;
      // this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 3: {
      const previousTutorialSubject = document.getElementById('navList');
      previousTutorialSubject.parentElement.style.border = 'none';
      previousTutorialSubject.parentElement.parentElement.style.zIndex = '1';

      const appSideNav = document.getElementById('appSideNav');
      if (appSideNav.style.visibility === 'visible') {
        const toggleBtn = document.getElementById('toggleStacksBtn');
        toggleBtn.click();
      }

      const speedDial = document.getElementById('speedDial');
      if (!speedDial.classList.contains('eco-opened')) {
        const hiddenFabTrigger = document.getElementById('hiddenFabTrigger');
        hiddenFabTrigger.click();
      }
      const tutorialSubject = document.getElementById('addStackBtn');
      const subjectBounds = tutorialSubject.getBoundingClientRect();
      tutorialSubject.parentElement.parentElement.parentElement.style.zIndex = '1100';
      tutorialSubject.style.border = 'solid 3px #76b29d';
      const icon = tutorialSubject.children[0].children[0];
      (icon as HTMLElement).style.marginBottom = '4px';
      const tutorialContainer = document.getElementById('cdk-overlay-1');
      /*this.tutorialStepTop = (subjectBounds.top - subjectBounds.height - (this.tutorialArrowTopOffset * 2)).toString()  + 'px';
      this.tutorialStepLeft = (subjectBounds.left - tutorialContainer.getBoundingClientRect().width).toString() + 'px';
      this.tutorialArrowDirection = 'right';
      this.tutorialArrowLeft = (subjectBounds.left - this.tutorialArrowLeftOffset - 13).toString() + 'px';
      this.tutorialArrowTop = (subjectBounds.top - subjectBounds.height).toString() + 'px';
      this.tutorialStep = 3;*/
      this.tutorialVisible = true;
     // this.tutorialStepText = 'Click here to create a new stack';
      // this.showTutorialPreviousBtn = true;
      // this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 4: {
      const speedDial = document.getElementById('speedDial');
      if (!speedDial.classList.contains('eco-opened')) {
        const hiddenFabTrigger = document.getElementById('hiddenFabTrigger');
        hiddenFabTrigger.click();
      }
      const previousTutorialSubject = document.getElementById('addStackBtn');
      previousTutorialSubject.parentElement.parentElement.parentElement.style.zIndex = 'auto';
      previousTutorialSubject.style.border = 'none';
      const previousIcon = previousTutorialSubject.children[0].children[0];
      (previousIcon as HTMLElement).style.marginBottom = '0px';

      const tutorialSubject = document.getElementById('addImageBtn');
      const subjectBounds = tutorialSubject.getBoundingClientRect();
      tutorialSubject.parentElement.parentElement.parentElement.style.zIndex = '1100';
      tutorialSubject.style.border = 'solid 3px #76b29d';
      const icon = tutorialSubject.children[0].children[0];
      (icon as HTMLElement).style.marginBottom = '4px';

      // const tutorialContainer = document.getElementById('cdk-overlay-1');
       // this.tutorialStepTop = (+this.tutorialStepTop.replace('px', '') - 50).toString() + 'px';
      // this.tutorialStepLeft = (subjectBounds.left - tutorialContainer.getBoundingClientRect().width).toString() + 'px';
      // this.tutorialArrowDirection = 'right';
      // this.tutorialArrowLeft = (subjectBounds.left - this.tutorialArrowLeftOffset - 13).toString() + 'px';
      // this.tutorialArrowTop = (+this.tutorialArrowTop.replace('px', '') - 50).toString() + 'px';
      // this.tutorialStep = 4;
      this.tutorialVisible = true;
      // this.tutorialStepText = 'Click here to add an image to the selected stack';
      // this.showTutorialPreviousBtn = true;
      // this.tutorialNextBtnText = 'FINISH';
      break;
    }
  }
}

public onFinish() {
  const previousTutorialSubject = document.getElementById('addImageBtn');
      previousTutorialSubject.parentElement.parentElement.parentElement.style.zIndex = 'auto';
      previousTutorialSubject.style.border = 'none';
      const previousIcon = previousTutorialSubject.children[0].children[0];
      (previousIcon as HTMLElement).style.marginBottom = '0px';
  const speedDial = document.getElementById('speedDial');
  if (speedDial.classList.contains('eco-opened')) {
    const hiddenFabTrigger = document.getElementById('hiddenFabTrigger');
    hiddenFabTrigger.click();
  }
  this.tutorialVisible = false;
}

public onPrevStep(currentStepNumber: number) {
  this.tutorialStep = currentStepNumber;
  switch (this.tutorialStep) {
    case 1: {
      const previousTutorialSubject = document.getElementById('navList');
      const previousSubjectBounds = previousTutorialSubject.getBoundingClientRect();
      previousTutorialSubject.parentElement.style.border = 'none';
      previousTutorialSubject.parentElement.parentElement.style.zIndex = '1';

      const appSideNav = document.getElementById('appSideNav');
      if (appSideNav.style.visibility === 'visible') {
        const toggleBtn = document.getElementById('toggleStacksBtn');
        toggleBtn.click();
      }

    //  this.tutorialStep = 1;
  this.tutorialVisible = true;
  const tutorialSubject = document.getElementById('toggleStacksBtn');
  const subjectBounds = tutorialSubject.getBoundingClientRect();
  tutorialSubject.parentElement.parentElement.style.zIndex = 'auto';
  const icon = tutorialSubject.children[0].children[0];
  (icon as HTMLElement).style.marginBottom = '4px';
  tutorialSubject.style.zIndex = '1100';
  tutorialSubject.style.border = 'solid 3px #76b29d';
  /* this.tutorialStepTop = (subjectBounds.top + (subjectBounds.height / 2) - (this.tutorialArrowTopOffset * 2)).toString() + 'px';
  this.tutorialStepLeft = (subjectBounds.width + 50).toString() + 'px';
  this.tutorialArrowDirection = 'left';
  this.tutorialArrowLeft = (subjectBounds.width + 50 - this.tutorialArrowLeftOffset).toString() + 'px';
  this.tutorialArrowTop = (subjectBounds.top + (subjectBounds.height / 2) - this.tutorialArrowTopOffset).toString() + 'px';
  this.tutorialStepText = 'Click here to show or hide the list of stacks';
  this.showTutorialPreviousBtn = false;
  this.tutorialNextBtnText = 'NEXT'; */
      break;
    }
    case 2: {
      const appSideNav = document.getElementById('appSideNav');
      if (appSideNav.style.visibility === 'hidden') {
        const toggleBtn = document.getElementById('toggleStacksBtn');
        toggleBtn.click();
      }

      const previousTutorialSubject = document.getElementById('addStackBtn');
      previousTutorialSubject.parentElement.parentElement.parentElement.style.zIndex = 'auto';
      previousTutorialSubject.style.border = 'none';
      const previousIcon = previousTutorialSubject.children[0].children[0];
      (previousIcon as HTMLElement).style.marginBottom = '0px';

      const speedDial = document.getElementById('speedDial');
      if (speedDial.classList.contains('eco-opened')) {
        const hiddenFabTrigger = document.getElementById('hiddenFabTrigger');
        hiddenFabTrigger.click();
      }

      const tutorialSubject = document.getElementById('navList');
      const subjectBounds = tutorialSubject.getBoundingClientRect();
      tutorialSubject.parentElement.style.zIndex = '1100';
      tutorialSubject.parentElement.style.border = 'solid 3px #76b29d';
      tutorialSubject.parentElement.parentElement.style.zIndex = 'auto';
      /* this.tutorialStepTop = (subjectBounds.top + (subjectBounds.height / 2) - (this.tutorialArrowTopOffset * 2)).toString() + 'px';
      this.tutorialStepLeft = (subjectBounds.width + 50).toString() + 'px';
      this.tutorialArrowDirection = 'left';
      this.tutorialArrowLeft = (subjectBounds.width + 50 - this.tutorialArrowLeftOffset).toString() + 'px';
      this.tutorialArrowTop = (subjectBounds.top + (subjectBounds.height / 2) - this.tutorialArrowTopOffset).toString() + 'px';
      this.tutorialStep = 2; */
      this.tutorialVisible = true;
      // this.tutorialStepText = 'Click on a stack to view the images within it';
      // this.showTutorialPreviousBtn = true;
      // this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 3: {
      const speedDial = document.getElementById('speedDial');
      if (!speedDial.classList.contains('eco-opened')) {
        const hiddenFabTrigger = document.getElementById('hiddenFabTrigger');
        hiddenFabTrigger.click();
      }

      const previousTutorialSubject = document.getElementById('addImageBtn');
      const previousSubjectBounds = previousTutorialSubject.getBoundingClientRect();
      previousTutorialSubject.parentElement.parentElement.parentElement.style.zIndex = 'auto';
      previousTutorialSubject.style.border = 'none';
      const previousIcon = previousTutorialSubject.children[0].children[0];
      (previousIcon as HTMLElement).style.marginBottom = '0px';

      const tutorialSubject = document.getElementById('addStackBtn');
      const subjectBounds = tutorialSubject.getBoundingClientRect();
      tutorialSubject.parentElement.parentElement.parentElement.style.zIndex = '1100';
      tutorialSubject.style.border = 'solid 3px #76b29d';
      const icon = tutorialSubject.children[0].children[0];
      (icon as HTMLElement).style.marginBottom = '4px';
      const tutorialContainer = document.getElementById('cdk-overlay-1');
     /*  this.tutorialStepTop = (subjectBounds.top - subjectBounds.height - (this.tutorialArrowTopOffset * 2)).toString()  + 'px';
      this.tutorialStepLeft = (subjectBounds.left - tutorialContainer.getBoundingClientRect().width).toString() + 'px';
      this.tutorialArrowDirection = 'right';
      this.tutorialArrowLeft = (subjectBounds.left - this.tutorialArrowLeftOffset - 13).toString() + 'px';
      this.tutorialArrowTop = (subjectBounds.top - subjectBounds.height).toString() + 'px';
      this.tutorialStep = 3; */
      this.tutorialVisible = true;
      // this.tutorialStepText = 'Click here to create a new stack';
      // this.showTutorialPreviousBtn = true;
      // this.tutorialNextBtnText = 'NEXT';
      break;
    }
  }
}

public showAbout() {

}

}


