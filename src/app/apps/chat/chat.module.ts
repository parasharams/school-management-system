import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SimplebarAngularModule } from 'simplebar-angular';
import { NgbAccordionModule, NgbDropdownModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatComponent } from './chat.component';
import { ChatUsersComponent } from './chat-users/chat-users.component';
import { ChatAreaComponent } from './chat-area/chat-area.component';


@NgModule({
  declarations: [
    ChatComponent,
    ChatUsersComponent,
    ChatAreaComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    UiModule,
    SimplebarAngularModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NgbModalModule,
    PageTitleModule,
    ChatRoutingModule
  ]
})
export class ChatModule { }
