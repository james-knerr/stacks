import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileSelectComponent } from './file-select.component';
import { MatIconModule, MatButtonModule } from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    CommonModule
  ],
  declarations: [FileSelectComponent],
  exports: [FileSelectComponent]
})
export class FileSelectModule { }

