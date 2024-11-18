import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgbCollapseModule, NgbDropdownModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { QuillModule } from 'ngx-quill';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ListRoutingModule } from './list-routing.module';
import { ListComponent } from './list.component';
import { TaskDetailsComponent } from './task-details/task-details.component';


@NgModule({
  declarations: [
    ListComponent,
    TaskDetailsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    NgbDropdownModule,
    NgbCollapseModule,
    NgbTooltipModule,
    UiModule,
    PageTitleModule,
    ListRoutingModule
  ]
})
export class ListModule { }
