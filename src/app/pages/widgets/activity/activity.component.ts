import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Activity } from './activity.model';

@Component({
  selector: 'app-widget-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  @Input() activities: Activity[] = [];

  constructor (private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

  /**
 * returns the safe content which can be rendered
 * @param content string
 */
  getRenderedPostContent(content: string) {
    return this.sanitizer.sanitize(1, content);
  }

}
