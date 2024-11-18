import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbNavModule, NgbProgressbarModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { ActivityComponent } from './activity/activity.component';
import { MessagesComponent } from './messages/messages.component';
import { ProjectsComponent } from './projects/projects.component';
import { TasksComponent } from './tasks/tasks.component';
import { FilesComponent } from './files/files.component';
import { PersonalInfoComponent } from './personal-info/personal-info.component';


@NgModule({
  declarations: [
    ProfileComponent,
    ActivityComponent,
    MessagesComponent,
    ProjectsComponent,
    TasksComponent,
    FilesComponent,
    PersonalInfoComponent
  ],
  imports: [
    CommonModule,
    NgbProgressbarModule,
    NgbNavModule,
    NgbTooltipModule,
    PageTitleModule,
    ProfileRoutingModule
  ]
})
export class ProfileModule { }
