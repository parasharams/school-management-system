import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuillModule } from 'ngx-quill';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { ComposeRoutingModule } from './compose-routing.module';
import { ComposeComponent } from './compose.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    ComposeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    QuillModule,
    SharedModule,
    PageTitleModule,
    ComposeRoutingModule
  ]
})
export class ComposeModule { }
