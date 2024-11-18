import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';


@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
