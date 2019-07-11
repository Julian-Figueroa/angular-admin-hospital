import { RouterModule, Routes } from '@angular/router';

import { LoginGuardGuard } from '../services/guards/login-guard.guard';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';



const pagesRoutes: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            { path: 'dashboard', component: DashboardComponent, data:{ titulo: 'Dashboard'} },
            { path: 'progress', component: ProgressComponent, data:{ titulo: 'Progress'} },
            { path: 'graph1', component: Graph1Component, data:{ titulo: 'Graphs'} },
            { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
        ]
    }
];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );