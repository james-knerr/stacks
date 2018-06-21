import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core.module/services/auth-guard.service';
const routes: Routes = [
    { path: 'auth', loadChildren: './login.module/login.module#LoginModule' },
    {
        path: 'app',
        loadChildren: './main.module/main.module#MainModule',
        canActivate: [AuthGuardService],
        data: {
            title: 'Stacks'
        }
    },
    { path: '', redirectTo: '/auth/sign-in', pathMatch: 'full' },
    { path: '**', redirectTo: '/auth/sign-in', pathMatch: 'full' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
        // enableTracing: true, // <-- debugging purposes only
    })],
    exports: [RouterModule],
    providers: [AuthGuardService]
})

export class AppRoutingModule { }

