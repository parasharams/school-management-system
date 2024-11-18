import { Component, OnInit } from '@angular/core';
import { QUICKACCESSITEMS } from '../data';
import { QuickAccessItem } from '../file-manager.model';

@Component({
  selector: 'app-file-quick-access',
  templateUrl: './quick-access.component.html',
  styleUrls: ['./quick-access.component.scss']
})
export class QuickAccessComponent implements OnInit {

  quickAccessItems: QuickAccessItem[] = [];

  constructor () { }

  ngOnInit(): void {
    this.quickAccessItems = QUICKACCESSITEMS;
  }

}
