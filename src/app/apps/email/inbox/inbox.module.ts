import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { InboxRoutingModule } from './inbox-routing.module';
import { InboxComponent } from './inbox.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    InboxComponent,

  ],
  imports: [
    CommonModule,
    NgbTooltipModule,
    NgbDropdownModule,
    SharedModule,
    PageTitleModule,
    InboxRoutingModule
  ]
})
export class InboxModule { }
