import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Icon } from '../icon.model';
import { FILLEDICONS, LINEICONS } from './data';

@Component({
  selector: 'app-bootstrap-icons',
  templateUrl: './bootstrap-icons.component.html',
  styleUrls: ['./bootstrap-icons.component.scss']
})
export class BootstrapIconsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  filledIcons: Icon[] = [];
  lineIcons: Icon[] = [];

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Icons', path: '/', }, { label: 'Bootstrap Icons', path: '/', active: true }];
    this.filledIcons = FILLEDICONS;
    this.lineIcons = LINEICONS;
  }


}
