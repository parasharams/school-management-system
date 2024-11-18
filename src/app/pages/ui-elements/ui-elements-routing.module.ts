import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiElementsComponent } from './ui-elements.component';

const routes: Routes = [{ path: '', component: UiElementsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UiElementsRoutingModule { }
