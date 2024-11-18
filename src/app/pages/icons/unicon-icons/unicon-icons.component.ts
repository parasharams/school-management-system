import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-unicon-icons',
  templateUrl: './unicon-icons.component.html',
  styleUrls: ['./unicon-icons.component.scss']
})
export class UniconIconsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Icons', path: '/', }, { label: 'Unicons Icon', path: '/', active: true }];
  }


}
