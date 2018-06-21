import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { MainService } from '../main.service';
import { StackListVM, StackVM } from '../../shared.module/models/stack-vm';
import { RecordVM } from '../../shared.module/models/record-vm';
import { AddRecordFormComponent } from '../../shared.module/add-record-form.component/add-record-form.component';

@Component({
  selector: 'app-stack-list',
  templateUrl: './stack-list.component.html',
  styleUrls: ['./stack-list.component.scss']
})
export class StackListComponent implements OnInit {
  public stacks: StackListVM[];
  public selectedStackId: string;

  constructor(
      private _dialog: MatDialog,
      private _mainService: MainService,
      private _router: Router,
      private _activeRoute: ActivatedRoute) {}

ngOnInit() {
  if (this._activeRoute.children != null && this._activeRoute.children.length > 0) {
  this._activeRoute.children[0].paramMap
  .pipe(switchMap((params: ParamMap) => {
    this.selectedStackId = params.get('stackId');
    return of(true);
      })).subscribe((bool: boolean) => {
        this.getStacks();
      });
    } else {
      this.getStacks();
    }
}

private getStacks() {
  this._mainService.getStacks().subscribe(k => {
    this.stacks = k;
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
  this._router.navigate(['content/' + stackId], { relativeTo: this._activeRoute });
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
