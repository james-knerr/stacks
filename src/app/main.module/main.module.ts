import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module/shared.module';
import { StackContentComponent } from './stack-content.component/stack-content.component';
import { RecordDetailsComponent } from './record-details.component/record-details.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule
  ],
  declarations: [
    StackContentComponent,
    RecordDetailsComponent],
  entryComponents: [RecordDetailsComponent]
})
export class MainModule { }
