import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


//maintenance query
type MaintenanceQuery = {
  id: number;
  title: string;
  icon?: string;
  desc: string;
}

@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {

  queryList: MaintenanceQuery[] = [];

  constructor (private titleService: Title) {
    titleService.setTitle("Maintenance | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template");
  }

  ngOnInit(): void {
    this.queryList = [
      {
        id: 1,
        title: 'Why is the Site Down?',
        icon: 'uil-presentation-lines-alt',
        desc: 'If several languages coalesce, the grammar of the resulting language is more simple.'
      },
      {
        id: 2,
        title: 'What is the Downtime?',
        icon: 'uil-clock-eight',
        desc: 'Everyone realizes why a new common language would be desirable one could refuse.'
      },
      {
        id: 3,
        title: 'Do you need Support?',
        icon: 'uil-envelope',
        desc: `You need to be sure there isn't anything embar.. Please
                                    contact us via email <a href="mailto:#"
                                        class="text-muted fw-semibold">no-reply@domain.com</a>`
      }
    ]
  }

  ngAfterViewInit(): void {
    document.body.classList.add('authentication-bg');
  }

  ngOnDestroy(): void {
    document.body.classList.remove('authentication-bg');
  }

}
