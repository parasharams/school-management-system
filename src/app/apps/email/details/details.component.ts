import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-email-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  replyFormat: string = '';

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Email', path: '/' }, { label: 'Email Detail', path: '/', active: true }];
    this.replyFormat = `
     <h3>This is an Air-mode editable area.</h3>
     <p><br></p>
     <ul>
     <li>Select a text to reveal the toolbar.</li>
     <li>Edit rich document on-the-fly, so elastic!</li>
     </ul>
     <p><br></p>
     <p>End of air-mode area</p>
    `
  }

}
