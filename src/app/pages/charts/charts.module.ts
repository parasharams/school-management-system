import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { ChartsRoutingModule } from './charts-routing.module';
import { ChartsComponent } from './charts.component';
import { UiModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [
    ChartsComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    UiModule,
    PageTitleModule,
    ChartsRoutingModule
  ]
})
export class ChartsModule { }
