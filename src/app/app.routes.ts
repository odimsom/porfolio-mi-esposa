import { Routes } from '@angular/router';
import { loginUnlockedGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage)
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage),
        canActivate: [loginUnlockedGuard]
    },
    {
        path: 'contact',
        loadComponent: () => import('./pages/contact/contact.page').then(m => m.ContactPage)
    },
    {
        path: '**',
        redirectTo: ''
    }
];


