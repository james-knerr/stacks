import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { RecordVM } from '../../shared.module/models/record-vm';

@Component({
    selector: 'app-record-details',
    templateUrl: './record-details.component.html',
    styleUrls: ['./record-details.component.scss']
  })
  export class RecordDetailsComponent {
    public record: RecordVM;
    public isImageVertical: boolean;
    public isImageHorizontal: boolean;

    constructor(
        private _selfDialogRef: MatDialogRef<RecordDetailsComponent>) {}

        public setModel(existingRecord: RecordVM) {
            this.record = existingRecord;
            const img = new Image();
            img.src = this.record.imageUrl;
            const width = img.naturalWidth;
            const height = img.naturalHeight;
            if (width >= height) {
                this.isImageHorizontal = true;
            } else {
                this.isImageVertical = true;
            }
        }
public closeDetails() {
    this._selfDialogRef.close();
}
  }
