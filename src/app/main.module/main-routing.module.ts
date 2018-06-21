import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './main-page.component/main-page.component';
import { StackListComponent } from './stack-list.component/stack-list.component';
import { StackContentComponent } from './stack-content.component/stack-content.component';
const mainRoutes: Routes = [
  {
    path: '',
    redirectTo: 'stacks',
    pathMatch: 'full'
},
    {
      path: '',
      component: MainPageComponent,
      children: [
        {
          path: 'stacks',
          component: StackListComponent,
          data: {
            menuItem: 'Stacks',
            title: 'Stacks'
          },
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
      ]
    }
  ];

@NgModule({
    imports: [RouterModule.forChild(mainRoutes)],
    exports: [RouterModule],
    providers: []
})

export class MainRoutingModule { }
