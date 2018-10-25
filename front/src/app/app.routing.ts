import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '', redirectTo: '/listTopic', pathMatch: 'full', canActivate: [AuthGuard]},

    // otherwise redirect to home
    { path: '**', redirectTo: '/listTopic' }
];

export const routing = RouterModule.forRoot(appRoutes);
