import { Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';
import { ServicesComponent } from './components/services/services.component';

// app.routes.ts
export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginFormComponent },
    { 
      path: 'adminPanel',
      component: AdminPanelComponent, 
      canActivate: [authGuard] 
    },
];
