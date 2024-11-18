import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'inbox', loadChildren: () => import('./inbox/inbox.module').then(m => m.InboxModule) },
  { path: 'details', loadChildren: () => import('./details/details.module').then(m => m.DetailsModule) },
  { path: 'compose', loadChildren: () => import('./compose/compose.module').then(m => m.ComposeModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailRoutingModule { }
