import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { NotfoundpageComponent } from './shared/notfoundpage/notfoundpage.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    //{ path: 'register', component: RegisterComponent },
    { path: '**', component: NotfoundpageComponent },
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });