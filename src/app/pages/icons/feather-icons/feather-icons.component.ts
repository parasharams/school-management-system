import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';
import { Icon } from '../icon.model';
import { FEATHERICONLIST, FEATHERICONWITHVARIANT } from './data';

@Component({
  selector: 'app-feather-icons',
  templateUrl: './feather-icons.component.html',
  styleUrls: ['./feather-icons.component.scss']
})
export class FeatherIconsComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  featherIcons: Icon[] = [];
  featherIconWithVariant: Icon[] = [];

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Icons', path: '/', }, { label: 'Feather Icons', path: '/', active: true }];
    this._fetchData();
  }

  /**
 * fetch data
 */
  _fetchData(): void {
    this.featherIcons = FEATHERICONLIST;
    this.featherIconWithVariant = FEATHERICONWITHVARIANT;
  }



}
