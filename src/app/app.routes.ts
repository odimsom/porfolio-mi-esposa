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

// Extend routes with Admin paths (they all load PortfolioPage for now, but URL changes allow Contextual Actions)
const adminRoutes: Routes = [
    { path: 'admin/todos', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/blogs', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/projects', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/experience', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/studies', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/skills', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/certificates', loadComponent: () => import('./pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
];

routes.push(...adminRoutes);
