import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GooglemapsComponent } from './googlemaps.component';

const routes: Routes = [{ path: '', component: GooglemapsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GooglemapsRoutingModule { }
