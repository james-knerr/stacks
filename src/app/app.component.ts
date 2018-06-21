import { Component, ChangeDetectorRef, OnInit, OnDestroy} from '@angular/core';
import { Router, Event, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material';
import { MainService } from './main.module/main.service';
import { AddRecordFormComponent } from './shared.module/add-record-form.component/add-record-form.component';
import { StackListVM, StackVM } from './shared.module/models/stack-vm';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  public stacks: StackListVM[];
  public selectedStackId: string;
  public mobileQuery: MediaQueryList;
  public pageTitle: string;
  public loadingRoute: boolean;

  private _mobileQueryListener: () => void;

  constructor(
    private _dialog: MatDialog,
    private _mainService: MainService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _titleService: Title,
    public changeDetectorRef: ChangeDetectorRef,
    public media: MediaMatcher) {
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    this._router.events.subscribe(
      (event: Event) => {
        this.loadingRoute = true;
        if (event instanceof NavigationEnd) {
          this.loadingRoute = false;
          let currentRoute = this._activatedRoute.root;
          while (currentRoute.children[0] !== undefined) {
            currentRoute = currentRoute.children[0];
          }
          const data = currentRoute.snapshot.data;
          this.pageTitle = JSON.parse(JSON.stringify(data)).title;
          this._titleService.setTitle(this.pageTitle);
        }
      });
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

}


