import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialModule } from './material.module/material.module';
import { FileSelectModule } from './file-select.module/file-select.module';

import { AddRecordFormComponent } from './add-record-form.component/add-record-form.component';
import { AddStackFormComponent } from './add-stack-form.component/add-stack-form.component';
import { ComponentSpinnerComponent } from './component-spinner.component/component-spinner.component';
import { GuidedTourComponent } from './guided-tour.component/guided-tour.component';

import { DeleteFilterPipe } from './pipes/deleted-stacks.pipe';
import { SliceArrayPipe } from './pipes/slice-array.pipe';
import { MainService } from '../main.module/main.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    FileSelectModule
  ],
  declarations: [
    AddRecordFormComponent,
    AddStackFormComponent,
    ComponentSpinnerComponent,
    GuidedTourComponent,
    DeleteFilterPipe,
    SliceArrayPipe
  ],
  exports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    MaterialModule,
    FileSelectModule,
    AddRecordFormComponent,
    AddStackFormComponent,
    ComponentSpinnerComponent,
    GuidedTourComponent,
    DeleteFilterPipe,
    SliceArrayPipe
  ],
  entryComponents: [AddRecordFormComponent, AddStackFormComponent]
})

export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        MainService
      ]
    };
  }
}

