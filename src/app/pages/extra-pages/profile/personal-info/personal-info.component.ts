import { Component, Input, OnInit } from '@angular/core';
import { UserInfo } from '../profile.model';

@Component({
  selector: 'app-profile-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {

  @Input() user?: UserInfo = {};

  constructor () { }

  ngOnInit(): void {
  }

}
