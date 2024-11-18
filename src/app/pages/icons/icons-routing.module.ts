import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BootstrapIconsComponent } from './bootstrap-icons/bootstrap-icons.component';
import { FeatherIconsComponent } from './feather-icons/feather-icons.component';
import { UniconIconsComponent } from './unicon-icons/unicon-icons.component';

const routes: Routes = [{
  path: 'unicon',
  component: UniconIconsComponent
},
{
  path: 'feather',
  component: FeatherIconsComponent
},
{
  path: 'bootstrap',
  component: BootstrapIconsComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IconsRoutingModule { }
