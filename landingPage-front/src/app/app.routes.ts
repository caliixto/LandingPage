import { Routes } from '@angular/router';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
    {path: '', component:HomeComponent},
    {path: 'adminPanel', component: AdminPanelComponent },
    {path: 'login', component:LoginFormComponent},
    {path: 'panel-admin', component: AdminPanelComponent, canActivate: [authGuard] // <--- Aquí conectas el "portero"
  },
];
