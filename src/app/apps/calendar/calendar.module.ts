import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import bootstrapPlugin from '@fullcalendar/bootstrap';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { WelcomeCardComponent } from './welcome-card/welcome-card.component';
import { CalendarEventComponent } from './event/event.component';
import { CalendarRoutingModule } from './calendar-routing.module';
import { CalendarComponent } from './calendar.component';



FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin,
  bootstrapPlugin,
  timeGridPlugin,
  listPlugin
]);

@NgModule({
  declarations: [
    CalendarComponent,
    WelcomeCardComponent,
    CalendarEventComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgbModalModule,
    FullCalendarModule,
    PageTitleModule,
    CalendarRoutingModule
  ]
})
export class CalendarModule { }
