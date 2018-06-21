import { Component, Input } from '@angular/core';

import { FileUploader } from './file-uploader.class';
// todo: filters

@Component({
  selector: 'app-file-select',
  templateUrl: './file-select.component.html',
  styleUrls: ['./file-select.component.scss']
})
export class FileSelectComponent {
  @Input() public uploader: FileUploader;
  @Input() public disabled: boolean;
  public constructor() {

  }

  public getOptions(): any {
    return this.uploader.options;
  }

  public getFilters(): any {
    return void 0;
  }

  // public isEmptyAfterSelection(): boolean {
  //    return !!this.element.nativeElement.attributes.multiple;
  // }

  public onChange(e: any): any {
    // let files = this.uploader.isHTML5 ? this.element.nativeElement[0].files : this.element.nativeElement[0];
    let files = e.srcElement.files;
    let options = this.getOptions();
    let filters = this.getFilters();

    // if(!this.uploader.isHTML5) this.destroy();

    this.uploader.addToQueue(files, options, filters);

    this.uploader.uploadAll();
  }
}
