import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { DetailsRoutingModule } from './details-routing.module';
import { DetailsComponent } from './details.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    DetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    NgbDropdownModule,
    NgbTooltipModule,
    SharedModule,
    PageTitleModule,
    DetailsRoutingModule
  ]
})
export class DetailsModule { }
