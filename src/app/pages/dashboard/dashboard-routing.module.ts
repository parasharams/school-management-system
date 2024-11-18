import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'ecommerce',
  loadChildren: () => import('./ecommerce/ecommerce.module').then(m => m.EcommerceModule)
},
{
  path: 'analytics',
  loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule)
},
{
  path: '',
  redirectTo: 'ecommerce',
  pathMatch: 'full'
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
