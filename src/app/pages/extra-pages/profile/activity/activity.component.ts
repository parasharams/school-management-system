import { Component, Input, OnInit } from '@angular/core';
import { ActivityItem } from '../profile.model';

@Component({
  selector: 'app-profile-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() activities: ActivityItem[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
