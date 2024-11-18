import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDatepickerModule, NgbDropdownModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { WidgetsRoutingModule } from './widgets-routing.module';
import { WidgetsComponent } from './widgets.component';
import { ChartWidgetComponent } from './chart-widget/chart-widget.component';
import { ProfileOneComponent } from './user-profile/profile-one/profile-one.component';
import { ProfileTwoComponent } from './user-profile/profile-two/profile-two.component';
import { ProfileThreeComponent } from './user-profile/profile-three/profile-three.component';
import { ProfileFourComponent } from './user-profile/profile-four/profile-four.component';
import { ProfileFiveComponent } from './user-profile/profile-five/profile-five.component';
import { StatisticsWidgetOneComponent } from './statistics-widget-one/statistics-widget-one.component';
import { StatisticsWidgetTwoComponent } from './statistics-widget-two/statistics-widget-two.component';
import { EventsComponent } from './events/events.component';
import { ActivityComponent } from './activity/activity.component';


@NgModule({
  declarations: [
    WidgetsComponent,
    ActivityComponent,
    ChartWidgetComponent,
    ProfileOneComponent,
    ProfileTwoComponent,
    ProfileThreeComponent,
    ProfileFourComponent,
    ProfileFiveComponent,
    StatisticsWidgetOneComponent,
    StatisticsWidgetTwoComponent,
    EventsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    NgbDropdownModule,
    NgApexchartsModule,
    SimplebarAngularModule,
    NgbDatepickerModule,
    NgbProgressbarModule,
    WidgetModule,
    PageTitleModule,
    WidgetsRoutingModule
  ]
})
export class WidgetsModule { }
