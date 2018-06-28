import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { CacheService } from 'ng2-cache';
import { MainService } from '../main.service';
import { LoginService } from '../../login.module/login.service';
import { AddRecordFormComponent } from '../../shared.module/add-record-form.component/add-record-form.component';
import { AddStackFormComponent } from '../../shared.module/add-stack-form.component/add-stack-form.component';
import { StackListVM, StackVM } from '../../shared.module/models/stack-vm';
import {
  GuidedTourConfig,
  RelativePosition
} from '../../shared.module/models/guided-tour-vm';
import { RecordVM } from '../../shared.module/models/record-vm';

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
        referenceElementId: 'speedDial',
        positionRelativeToReferenceElement: RelativePosition.left
      }
    },
    {
      stepNumber: 4,
      text: 'Click here to add an image to the selected stack',
      overlayPosition: {
        referenceElementId: 'speedDial',
        positionRelativeToReferenceElement: RelativePosition.left
      }
    }]
  };

  public tutorialStep = 1;
  public tutorialVisible = false;

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
  const dialogRef = this._dialog.open(AddStackFormComponent, { disableClose: true });
  dialogRef.componentInstance.setModel();
  dialogRef.afterClosed()
      .subscribe(result => {
          this.handleAddStackFormClosed(result);
      });
}

public handleAddStackFormClosed(result: { event: string, data?: StackListVM }) {
  switch (result.event) {
      case 'cancelled':
          // do nothing
          break;
      case 'added':
      this.stacks.push(result.data);
      this.stackSelected(result.data.id);
          // unsure
          break;
      default:
      // throw error
          break;
  }
}
public addRecord() {
  const dialogRef = this._dialog.open(AddRecordFormComponent, { disableClose: true });
  dialogRef.componentInstance.setModel(this.selectedStackId);
  dialogRef.afterClosed()
      .subscribe(result => {
          this.handleAddRecordFormClosed(result);
      });
}

public handleAddRecordFormClosed(result: { event: string, data?: RecordVM }) {
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
  (icon as HTMLElement).style.marginBottom = '7px';
  tutorialSubject.style.zIndex = '1100';
  tutorialSubject.style.border = 'solid 3px #76b29d';
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
      this.tutorialVisible = true;
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
      (icon as HTMLElement).style.marginBottom = '7px';
      const tutorialContainer = document.getElementById('cdk-overlay-1');
      this.tutorialVisible = true;
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
      (icon as HTMLElement).style.marginBottom = '7px';
      this.tutorialVisible = true;
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
  this.tutorialVisible = true;
  const tutorialSubject = document.getElementById('toggleStacksBtn');
  const subjectBounds = tutorialSubject.getBoundingClientRect();
  tutorialSubject.parentElement.parentElement.style.zIndex = 'auto';
  const icon = tutorialSubject.children[0].children[0];
  (icon as HTMLElement).style.marginBottom = '7px';
  tutorialSubject.style.zIndex = '1100';
  tutorialSubject.style.border = 'solid 3px #76b29d';
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
      this.tutorialVisible = true;
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
      (icon as HTMLElement).style.marginBottom = '7px';
      const tutorialContainer = document.getElementById('cdk-overlay-1');
      this.tutorialVisible = true;
      break;
    }
  }
}

public showAbout() {

}

}


