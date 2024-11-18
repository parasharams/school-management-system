import { Component, OnInit } from '@angular/core';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

//table record
interface PersonDetails {
  id: number;
  firstName: string;
  lastName: string;
  handle: string;
}


@Component({
  selector: 'app-basic-table',
  templateUrl: './basic.component.html',
  styleUrls: ['./basic.component.scss']
})
export class BasicComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];
  personData: PersonDetails[] = [];

  constructor () { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Tables', path: '/', }, { label: 'Basic Tables', path: '/', active: true }];
    this.personData = [
      {
        id: 1,
        firstName: 'Mark',
        lastName: 'Otto',
        handle: '@mdo'
      },
      {
        id: 2,
        firstName: 'Jacob',
        lastName: 'Thornton',
        handle: '@fat'
      },
      {
        id: 3,
        firstName: 'Larry',
        lastName: 'the Bird',
        handle: '@twitter'
      }
    ];

  }

}
