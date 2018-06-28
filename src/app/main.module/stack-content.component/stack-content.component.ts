import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog } from '@angular/material';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { MainService } from '../main.service';
import { RecordDetailsComponent } from '../record-details.component/record-details.component';
import { StackVM } from '../../shared.module/models/stack-vm';
import { RecordVM } from '../../shared.module/models/record-vm';

@Component({
  selector: 'app-stack-content',
  templateUrl: './stack-content.component.html',
  styleUrls: ['./stack-content.component.scss']
})
export class StackContentComponent implements OnInit {
public stack: StackVM;
public selectedStackId: string;
public isBusy: boolean;
public refreshNeededSub: any;

  constructor(
    private _snackBar: SnackBarService,
    private _dialog: MatDialog,
    private _mainService: MainService,
    private _activeRoute: ActivatedRoute) {
      this.refreshNeededSub = this._mainService.stackUpdated$.subscribe((newRecord: RecordVM) => {
        if (newRecord != null && this.selectedStackId) {
          this.stack.records.push(newRecord);
        }
      });
    }

ngOnInit() {
  this._activeRoute.paramMap
  .pipe(switchMap((params: ParamMap) => {
    this.selectedStackId = params.get('stackId');
        return of(true);
      })).subscribe((bool: boolean) => {
        this.getStack();
      });

}

public getStack(forceRefresh?: boolean) {
  if (this.selectedStackId) {
  this.isBusy = true;
  this._mainService.getStack(this.selectedStackId)
    .subscribe(k => {
      this.stack = k;
      this.isBusy = false;
    }, err => {
      this._snackBar.open('error', err, 'OK');
      this.isBusy = false;
    });
  }
}

public viewRecordDetails(record: RecordVM) {
  const dialogRef = this._dialog.open(RecordDetailsComponent, { disableClose: false });
  dialogRef.componentInstance.setModel(record);
}
}
