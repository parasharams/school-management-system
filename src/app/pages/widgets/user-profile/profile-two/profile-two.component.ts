import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-profile-two',
  templateUrl: './profile-two.component.html',
  styleUrls: ['./profile-two.component.scss']
})
export class ProfileTwoComponent implements OnInit {

  @Input() userName?: string;
  @Input() designation?: string;
  @Input() profileImage?: string;
  @Input() coverImage?: string;
  constructor () { }

  ngOnInit(): void {
  }

}
