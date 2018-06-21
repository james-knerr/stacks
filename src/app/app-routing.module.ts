import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
    {
        path: '',
        loadChildren: './main.module/main.module#MainModule',
        data: {
            title: 'Stacks'
        }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // enableTracing: true, // <-- debugging purposes only
    })],
    exports: [RouterModule]
})

export class AppRoutingModule { }

