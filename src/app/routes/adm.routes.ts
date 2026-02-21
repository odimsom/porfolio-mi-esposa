import { Routes } from '@angular/router';
import { routes } from '../app.routes';

const adminRoutes: Routes = [
    { path: 'admin/todos', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/blogs', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/projects', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/experience', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/studies', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/skills', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
    { path: 'admin/certificates', loadComponent: () => import('../pages/portfolio/portfolio.page').then(m => m.PortfolioPage) },
];

routes.push(...adminRoutes);