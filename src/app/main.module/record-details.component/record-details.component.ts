import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { MainService } from '../main.service';
import { RecordVM } from '../../shared.module/models/record-vm';

@Component({
    selector: 'app-record-details',
    templateUrl: './record-details.component.html',
    styleUrls: ['./record-details.component.scss']
  })
  export class RecordDetailsComponent {
    public record: RecordVM;

    constructor(
        private _mainService: MainService,
        private _selfDialogRef: MatDialogRef<RecordDetailsComponent>) {}

        public setModel(existingRecord?: RecordVM) {
            this.record = existingRecord || new RecordVM();
        }

public closeDetails() {
    this._selfDialogRef.close();
}
  }
