import { Component, OnInit } from '@angular/core';
import { PROJECTLIST } from 'src/app/apps/projects/shared/data';
import { Project } from 'src/app/apps/projects/shared/projects.model';
import { TODAYTASKS, UPCOMINGTASKS } from 'src/app/apps/tasks/shared/data';
import { ListTaskItem } from 'src/app/apps/tasks/shared/tasks.model';
import { AuthenticationService } from 'src/app/core/service/auth.service';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { ACTIVITYTIMELINE, FILES, MESSAGES } from './data';
import { ActivityItem, FileItem, Message, UserInfo } from './profile.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  user?: UserInfo;
  activities: ActivityItem[] = [];
  projects: Project[] = [];
  files: FileItem[] = [];
  messages: Message[] = [];
  taskList: ListTaskItem[] = [];

  active: string = 'activity';


  constructor (private authService: AuthenticationService) { }


  ngOnInit(): void {
    this.pageTitle = [{ label: 'Pages', path: '/' }, { label: 'Profile', path: '/', active: true }];
    let loggedInUser = this.authService.currentUser();
    this.user = {
      userName: loggedInUser?.name,
      designation: loggedInUser?.title,
      location: loggedInUser?.location,
      avatar: loggedInUser?.avatar,
      profileProgress: 60,
      about: 'Hi I\'m Shreyu.I am user experience and user interface designer.I have been working on UI & UX since last 10 years.',
      email: 'xyz123@gmail.com',
      phone: '(123) 123 1234',
      address: '1975 Boring Lane, San Francisco, California, United States - 94108',
      skills: ['UI Design', 'UX', 'Sketch', 'Photoshop', 'Frontend']
    }

    this._fetchData();
  }

  /**
   * fetch data
   */
  _fetchData(): void {
    this.activities = ACTIVITYTIMELINE;
    this.messages = MESSAGES;
    this.files = FILES;
    this.projects = PROJECTLIST;
    this.taskList = [...TODAYTASKS, ...UPCOMINGTASKS];
  }

}
