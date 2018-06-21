import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StackContentComponent } from './stack-content.component/stack-content.component';
const mainRoutes: Routes = [
      {
        path: 'content/:stackId',
        component: StackContentComponent,
        data: {
          menuItem: 'Stacks',
          title: 'Stacks'
        },
      }
  ];
@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: []
})

export class MainRoutingModule { }
