import {RouterModule, Routes} from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import {DashboardComponent} from './dashboard/dashboard.component';

export const AppRoutes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    // canActivate: {NeedAuthGuard}
  }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);


