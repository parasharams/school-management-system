import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule, NgbNavModule, NgbProgressbarModule, } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { AnalyticsRoutingModule } from './analytics-routing.module';
import { AnalyticsComponent } from './analytics.component';


@NgModule({
  declarations: [
    AnalyticsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgbNavModule,
    NgbDropdownModule,
    NgbProgressbarModule,
    WidgetModule,
    PageTitleModule,
    AnalyticsRoutingModule
  ]
})
export class AnalyticsModule { }
