import { NgModule } from '@angular/core';
import { SharedModule } from '../shared.module/shared.module';
import { MainPageComponent } from './main-page.component/main-page.component';
import { StackContentComponent } from './stack-content.component/stack-content.component';
import { StackListComponent } from './stack-list.component/stack-list.component';
import { RecordDetailsComponent } from './record-details.component/record-details.component';
import { MainRoutingModule } from './main-routing.module';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';

@NgModule({
  imports: [
    SharedModule,
    MainRoutingModule,
    EcoFabSpeedDialModule
  ],
  declarations: [
    MainPageComponent,
    StackListComponent,
    StackContentComponent,
    RecordDetailsComponent],
  entryComponents: [RecordDetailsComponent]
})
export class MainModule { }
