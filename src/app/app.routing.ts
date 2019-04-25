import {RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './guards/auth-guard.service';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: []
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: [AuthGuardService],
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);


