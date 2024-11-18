import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbNavModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { FileManagerRoutingModule } from './file-manager-routing.module';
import { FileManagerComponent } from './file-manager.component';
import { QuickAccessComponent } from './quick-access/quick-access.component';
import { RecentComponent } from './recent/recent.component';
import { LeftPanelComponent } from './left-panel/left-panel.component';
import { TopPanelComponent } from './top-panel/top-panel.component';



@NgModule({
  declarations: [
    FileManagerComponent,
    QuickAccessComponent,
    RecentComponent,
    LeftPanelComponent,
    TopPanelComponent
  ],
  imports: [
    CommonModule,
    NgApexchartsModule,
    NgbTooltipModule,
    NgbDropdownModule,
    NgbNavModule,
    PageTitleModule,
    FileManagerRoutingModule
  ]
})
export class FileManagerModule { }
