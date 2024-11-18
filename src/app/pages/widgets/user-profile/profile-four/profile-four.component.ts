import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-profile-four',
  templateUrl: './profile-four.component.html',
  styleUrls: ['./profile-four.component.scss']
})
export class ProfileFourComponent implements OnInit {

  @Input() userName?: string;
  @Input() location?: string;
  @Input() profileImage?: string;

  constructor () { }

  ngOnInit(): void {
  }

}
