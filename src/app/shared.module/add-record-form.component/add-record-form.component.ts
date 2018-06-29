import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MainService } from '../../main.module/main.service';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { StackVM } from '../../shared.module/models/stack-vm';
import { RecordVM } from '../../shared.module/models/record-vm';

@Component({
    selector: 'app-add-record-form',
    templateUrl: './add-record-form.component.html',
    styleUrls: ['./add-record-form.component.scss']
  })
export class AddRecordFormComponent {
    public stackId: string;
    public stack: StackVM;
    public selectedTabIndex: number; // add tabs later so one will be to upload a pic and one will be to paste a url
    public record: RecordVM;
    public isBusy: boolean;

    constructor(
        private _snackBar: SnackBarService,
        private _mainService: MainService,
        private _selfDialogRef: MatDialogRef<AddRecordFormComponent>) {}

        public setModel(stackId: string) {
            this.record = new RecordVM();
            this.stackId = stackId;
            this.selectedTabIndex = 0;
        }

    public cancel() {
        this._selfDialogRef.close({ event: 'cancelled', data: null });
    }

    public fetchRecordDetails(evt: any) {
        this.isBusy = true;
        // fetch additional details about image from website
        this.isBusy = false;
    }
  public saveRecord() {
    this.isBusy = true;
    this._mainService.addRecord(this.record, this.stackId)
      .subscribe(k => {
        this.isBusy = false;
        this._snackBar.open('success', 'Added New Image!', 'OK');
        this._selfDialogRef.close({ event: 'added', data: this.record });
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isBusy = false;
      });
  }
  }
