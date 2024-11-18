import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-email-compose',
  templateUrl: './compose.component.html',
  styleUrls: ['./compose.component.scss']
})
export class ComposeComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  mailTo: string = '';
  mailSubject: string = '';
  mailBody: string = '';

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Email', path: '/' }, { label: 'Compose Email', path: '/', active: true }];
  }

}
