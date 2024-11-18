import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { UiModule } from 'src/app/shared/ui/ui.module';
import { IconsRoutingModule } from './icons-routing.module';
import { UniconIconsComponent } from './unicon-icons/unicon-icons.component';
import { FeatherIconsComponent } from './feather-icons/feather-icons.component';
import { BootstrapIconsComponent } from './bootstrap-icons/bootstrap-icons.component';



@NgModule({
  declarations: [
    UniconIconsComponent,
    FeatherIconsComponent,
    BootstrapIconsComponent
  ],
  imports: [
    CommonModule,
    UiModule,
    PageTitleModule,
    IconsRoutingModule
  ]
})
export class IconsModule { }
