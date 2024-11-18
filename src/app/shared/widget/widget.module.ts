import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { SimplebarAngularModule } from 'simplebar-angular';
import { ChartStatisticsWidgetComponent } from './chart-statistics-widget/chart-statistics-widget.component';
import { MembersComponent } from './members/members.component';
import { ChatComponent } from './chat/chat.component';
import { OverviewComponent } from './overview/overview.component';
import { UiModule } from '../ui/ui.module';
import { TaskListComponent } from './task-list/task-list.component';
import { ChartStatisticsTwoWidgetComponent } from './chart-statistics-two-widget/chart-statistics-two-widget.component';
import { PricingCardsComponent } from './pricing-cards/pricing-cards.component';
import { VectormapComponent } from './vectormap/vectormap.component';
import { SpainMapComponent } from './vectormap/spain-map/spain-map.component';
import { RussiaMapComponent } from './vectormap/russia-map/russia-map.component';
import { ItalyMapComponent } from './vectormap/italy-map/italy-map.component';
import { IraqMapComponent } from './vectormap/iraq-map/iraq-map.component';
import { UsaMapComponent } from './vectormap/usa-map/usa-map.component';
import { WorldMapComponent } from './vectormap/world-map/world-map.component';
import { CanadaMapComponent } from './vectormap/canada-map/canada-map.component';



@NgModule({
  declarations: [
    ChartStatisticsWidgetComponent,
    ChartStatisticsTwoWidgetComponent,
    MembersComponent,
    ChatComponent,
    OverviewComponent,
    TaskListComponent,
    PricingCardsComponent,
    VectormapComponent,
    CanadaMapComponent,
    WorldMapComponent,
    UsaMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    RussiaMapComponent,
    SpainMapComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgApexchartsModule,
    SimplebarAngularModule,
    NgbDropdownModule,
    UiModule
  ],
  exports: [
    ChartStatisticsWidgetComponent,
    ChartStatisticsTwoWidgetComponent,
    MembersComponent,
    ChatComponent,
    OverviewComponent,
    TaskListComponent,
    PricingCardsComponent,
    VectormapComponent,
    CanadaMapComponent,
    WorldMapComponent,
    UsaMapComponent,
    IraqMapComponent,
    ItalyMapComponent,
    RussiaMapComponent,
    SpainMapComponent
  ]
})
export class WidgetModule { }
