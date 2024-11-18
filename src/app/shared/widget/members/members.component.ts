import { Component, Input, OnInit } from '@angular/core';
import { Member } from './members.model';

@Component({
  selector: 'app-widget-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  @Input() cardTitle: string = "";
  @Input() memberList: Member[] = [];

  constructor () { }

  ngOnInit(): void {
  }

}
