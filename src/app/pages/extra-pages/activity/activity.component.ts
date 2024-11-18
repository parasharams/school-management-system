import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { TimelineItem } from './activity.model';
import { TIMELINE1, TIMELINE2 } from './data';

@Component({
  selector: 'app-activity-page',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  timelineData1!: TimelineItem;
  timelineData2!: TimelineItem;


  constructor (private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Pages', path: '/' }, { label: 'Activity', path: '/', active: true }];
    this._fetchData();
  }

  /**
   * fetches timeline data
   */
  _fetchData(): void {
    this.timelineData1 = TIMELINE1;
    this.timelineData2 = TIMELINE2;
  }


  /**
 * returns the safe content which can be rendered
 * @param content content
 */
  getRenderedPostContent(content: string) {
    return this.sanitizer.sanitize(1, content);
  }
}
