import { NgModule } from '@angular/core';
import { EcoFabSpeedDialModule } from '@ecodev/fab-speed-dial';
import { SharedModule } from '../shared.module/shared.module';
import { StackContentComponent } from './stack-content.component/stack-content.component';
import { RecordDetailsComponent } from './record-details.component/record-details.component';
import { MainPageComponent } from './main-page.component/main-page.component';
import { MainRoutingModule } from './main-routing.module';

@NgModule({
  imports: [
    SharedModule,
    EcoFabSpeedDialModule,
    MainRoutingModule
  ],
  declarations: [
    MainPageComponent,
    StackContentComponent,
    RecordDetailsComponent],
  entryComponents: [RecordDetailsComponent]
})
export class MainModule { }
