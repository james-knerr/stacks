import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { CacheService } from 'ng2-cache';
import { MainService } from '../main.service';
import { LoginService } from '../../login.module/login.service';
import { AddRecordFormComponent } from '../../shared.module/add-record-form.component/add-record-form.component';
import { StackListVM, StackVM } from '../../shared.module/models/stack-vm';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit, OnDestroy {
  public stacks: StackListVM[];
  public selectedStackId: string;
  public mobileQuery: MediaQueryList;

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
  this.tutorialStepTop = tutorialSubject.offsetTop.toString() + 'px';
  this.tutorialStepLeft = (tutorialSubject.offsetLeft + 75).toString() + 'px';
  this.tutorialArrowDirection = 'left';
  this.tutorialArrowLeft = (tutorialSubject.offsetLeft + 51).toString() + 'px';
  this.tutorialArrowTop = (tutorialSubject.offsetTop + 12).toString() + 'px';
  this.tutorialStepText = 'Click here to show or hide the list of stacks';
  this.showTutorialPreviousBtn = false;
  this.tutorialNextBtnText = 'NEXT';
}

public nextStep() {
  switch (this.tutorialStep) {
    case 1: {
      this.tutorialStep = 2;
      this.tutorialVisible = true;
      this.tutorialStepTop = '200px';
      this.tutorialStepLeft = '200px';
      this.tutorialStepText = 'Click on a stack to view the images within it';
      this.showTutorialPreviousBtn = true;
      this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 2: {
      this.tutorialStep = 3;
      this.tutorialVisible = true;
      this.tutorialStepTop = '300px';
      this.tutorialStepLeft = '300px';
      this.tutorialStepText = 'Click here to create a new stack';
      this.showTutorialPreviousBtn = true;
      this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 3: {
      this.tutorialStep = 4;
      this.tutorialVisible = true;
      this.tutorialStepTop = '400px';
      this.tutorialStepLeft = '400px';
      this.tutorialStepText = 'Click here to add an image to the selected stack';
      this.showTutorialPreviousBtn = true;
      this.tutorialNextBtnText = 'FINISH';
      break;
    }
    case 4: {
      this.tutorialVisible = false;
      break;
    }
  }
}

public prevStep() {
  switch (this.tutorialStep) {
    case 2: {
      this.tutorialStep = 1;
      this.tutorialVisible = true;
      this.tutorialStepTop = '100px';
      this.tutorialStepLeft = '100px';
      this.tutorialStepText = 'Click here to show or hide the list of stacks';
      this.showTutorialPreviousBtn = false;
      this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 3: {
      this.tutorialStep = 2;
      this.tutorialVisible = true;
      this.tutorialStepTop = '200px';
      this.tutorialStepLeft = '200px';
      this.tutorialStepText = 'Click on a stack to view the images within it';
      this.showTutorialPreviousBtn = true;
      this.tutorialNextBtnText = 'NEXT';
      break;
    }
    case 4: {
      this.tutorialStep = 3;
      this.tutorialVisible = true;
      this.tutorialStepTop = '300px';
      this.tutorialStepLeft = '300px';
      this.tutorialStepText = 'Click here to create a new stack';
      this.showTutorialPreviousBtn = true;
      this.tutorialNextBtnText = 'NEXT';
      break;
    }
  }
}

public showAbout() {

}

}


