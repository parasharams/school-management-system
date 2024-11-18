import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-widget-profile-one',
  templateUrl: './profile-one.component.html',
  styleUrls: ['./profile-one.component.scss']
})
export class ProfileOneComponent implements OnInit {

  @Input() userName?: string;
  @Input() designation?: string;
  @Input() profileImage?: string;
  @Input() about?: string;
  @Input() tags?: string[];

  constructor () { }

  ngOnInit(): void {
  }

}
