import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { BasicRoutingModule } from './basic-routing.module';
import { BasicComponent } from './basic.component';


@NgModule({
  declarations: [
    BasicComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    PageTitleModule,
    BasicRoutingModule
  ]
})
export class BasicModule { }
