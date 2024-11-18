import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';

import { ActivityRoutingModule } from './activity-routing.module';
import { ActivityComponent } from './activity.component';


@NgModule({
  declarations: [
    ActivityComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    ActivityRoutingModule
  ]
})
export class ActivityModule { }
