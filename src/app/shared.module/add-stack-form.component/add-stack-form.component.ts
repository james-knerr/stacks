import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MainService } from '../../main.module/main.service';
import { SnackBarService } from '../../core.module/services/snackbar.service';
import { StackListVM } from '../../shared.module/models/stack-vm';

@Component({
    selector: 'app-add-stack-form',
    templateUrl: './add-stack-form.component.html',
    styleUrls: ['./add-stack-form.component.scss']
  })
export class AddStackFormComponent {
    public stack: StackListVM;
    public isBusy: boolean;

    constructor(
        private _snackBar: SnackBarService,
        private _mainService: MainService,
        private _selfDialogRef: MatDialogRef<AddStackFormComponent>) {}

        public setModel(newStackId: string) {
            this.stack = new StackListVM();
            this.stack.id = newStackId;
        }

    public cancel() {
        this._selfDialogRef.close({ event: 'cancelled', data: null });
    }

  public saveStack() {
    this.isBusy = true;
    this._mainService.addStack(this.stack)
      .subscribe(k => {
        this.isBusy = false;
        this._snackBar.open('success', 'Added New Stack!', 'OK');
        this._selfDialogRef.close({ event: 'added', data: this.stack });
      }, err => {
        this._snackBar.open('error', err, 'OK');
        this.isBusy = false;
      });
  }
  }
