import { Component, OnInit } from '@angular/core';
import { RECENTFILES } from '../data';
import { RecentItem } from '../file-manager.model';

@Component({
  selector: 'app-file-recent',
  templateUrl: './recent.component.html',
  styleUrls: ['./recent.component.scss']
})
export class RecentComponent implements OnInit {

  recentFiles: RecentItem[] = [];

  constructor () { }

  ngOnInit(): void {
    this.recentFiles = RECENTFILES;
  }

}
