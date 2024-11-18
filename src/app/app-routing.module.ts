import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { loggedInUser } from './core/helpers/utils';
import { EventService } from './core/service/event.service';
import { LayoutContainerComponent } from './layout/layout-container.component';


const rootRoute = loggedInUser() ? 'dashboard/ecommerce' : 'landing';

const routes: Routes = [
  {
    path: '',
    redirectTo: rootRoute,
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutContainerComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
      { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule)},
      { path: 'academics', loadChildren: () => import('./masters/masters.module').then(m => m.MastersModule) },
      { path: 'exam', loadChildren: () => import('./exam/exam.module').then(m => m.ExamModule) },
      { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
    ]
  },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'maintenance', loadChildren: () => import('./pages/extra-pages/maintenance/maintenance.module').then(m => m.MaintenanceModule) },
  { path: 'error-404', loadChildren: () => import('./pages/extra-pages/error404/error404.module').then(m => m.Error404Module) },
  { path: 'error-500', loadChildren: () => import('./pages/extra-pages/error500/error500.module').then(m => m.Error500Module) },
  { path: 'landing', loadChildren: () => import('./pages/landing-page/landing-page.module').then(m => m.LandingPageModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled' })],
  exports: [RouterModule],
  providers: [EventService]
})
export class AppRoutingModule { }
