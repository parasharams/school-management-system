import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PROJECTLIST } from '../shared/data';
import { Project } from '../shared/projects.model';

@Component({
  selector: 'app-project-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  projectList: Project[] = [];
  displayCount: number = 3;
  modifiedTeamMembers: any = [];

  constructor (private titleService: Title) {
    titleService.setTitle("Projects | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template");
  }

  ngOnInit(): void {
    // get project list
    this._fetchData();
  }

  /**
   * fetches project list
   */
  _fetchData(): void {
    this.projectList = PROJECTLIST;
  }

  /**
   * get remaining members to display
   * @param memberList member list
   */
  getDisplayMembersList(memberList: any): any {
    if (memberList.length <= this.displayCount || (memberList.length - this.displayCount) == 1) {
      this.modifiedTeamMembers = memberList;
    }
    else {
      this.modifiedTeamMembers = memberList.filter((m: any, index: number) => index < this.displayCount)
    }
    return this.modifiedTeamMembers;
  }

}
