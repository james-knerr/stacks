import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StackContentComponent } from './stack-content.component/stack-content.component';
import { MainPageComponent } from './main-page.component/main-page.component';
import { AuthGuardService } from '../core.module/services/auth-guard.service';
const mainRoutes: Routes = [
  {
    path: '',
    component: MainPageComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'content/:stackId',
        component: StackContentComponent,
        data: {
          menuItem: 'Stacks',
          title: 'Stacks'
        },
      }
  ]
}
];
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: [AuthGuardService]
})

export class MainRoutingModule { }
