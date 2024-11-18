import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';
import { NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { WidgetModule } from 'src/app/shared/widget/widget.module';
import { EcommerceRoutingModule } from './ecommerce-routing.module';
import { EcommerceComponent } from './ecommerce.component';



@NgModule({
  declarations: [
    EcommerceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgApexchartsModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    WidgetModule,
    UiModule,
    EcommerceRoutingModule
  ]
})
export class EcommerceModule { }
