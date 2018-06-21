import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login.component/login.component';
import { LoginRegistrationComponent } from './login-registration.component/login-registration.component';
import { LoginPageComponent } from './login-page.component/login-page.component';
import { LoginForgotPasswordComponent } from './login-forgot-password.component/login-forgot-password.component';
import { LoginRegistrationTermsComponent } from './login-registration-terms.component/login-registration-terms.component';

const loginRoutes: Routes = [
    {
        path: '',
        redirectTo: '/auth/sign-in',
        pathMatch: 'full'
    },
    {
        path: '',
        component: LoginPageComponent,
        data: {
            menuItem: 'Login',
            title: 'Sign In'
        },
        children: [
            {
                path: 'sign-in',
                component: LoginComponent,
                data: {
                    menuItem: 'Login',
                    title: 'Sign In'
                }
            },
            {
                path: 'sign-up',
                component: LoginRegistrationComponent,
                data: {
                    menuItem: 'Login',
                    title: 'Sign Up'
                }
            },
            {
                path: 'terms',
                component: LoginRegistrationTermsComponent,
                data: {
                    menuItem: 'Login',
                    title: 'Terms of Use'
                }
            },
            {
                path: 'forgot-password',
                component: LoginForgotPasswordComponent,
                data: {
                    menuItem: 'Login',
                    title: 'Forgot Password'
                }
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(loginRoutes)],
    exports: [RouterModule]
})

export class LoginRoutingModule { }
