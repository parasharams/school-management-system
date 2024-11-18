import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAccordionModule, NgbAlertModule, NgbDropdownModule, NgbModalModule, NgbNavModule, NgbPopoverModule, NgbProgressbarModule, NgbToastModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { UiElementsRoutingModule } from './ui-elements-routing.module';
import { UiElementsComponent } from './ui-elements.component';
import { AlertsComponent } from './alerts/alerts.component';
import { ToastsComponent } from './toasts/toasts.component';
import { ButtonsComponent } from './buttons/buttons.component';
import { BadgesComponent } from './badges/badges.component';
import { CardsComponent } from './cards/cards.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { NavTabsComponent } from './nav-tabs/nav-tabs.component';
import { AccordionsComponent } from './accordions/accordions.component';
import { ModalsComponent } from './modals/modals.component';
import { ProgressbarComponent } from './progressbar/progressbar.component';
import { PopoverComponent } from './popover/popover.component';
import { TooltipsComponent } from './tooltips/tooltips.component';
import { SpinnerComponent } from './spinner/spinner.component';


@NgModule({
  declarations: [
    UiElementsComponent,
    AlertsComponent,
    ToastsComponent,
    ButtonsComponent,
    BadgesComponent,
    CardsComponent,
    DropdownsComponent,
    NavTabsComponent,
    AccordionsComponent,
    ModalsComponent,
    ProgressbarComponent,
    PopoverComponent,
    TooltipsComponent,
    SpinnerComponent
  ],
  imports: [
    CommonModule,
    NgbAccordionModule,
    NgbAlertModule,
    NgbDropdownModule,
    NgbModalModule,
    NgbNavModule,
    NgbPopoverModule,
    NgbProgressbarModule,
    NgbToastModule,
    NgbTooltipModule,
    UiModule,
    PageTitleModule,
    UiElementsRoutingModule
  ]
})
export class UiElementsModule { }
