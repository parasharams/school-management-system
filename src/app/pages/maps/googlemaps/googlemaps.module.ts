import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { environment } from 'src/environments/environment';
import { GooglemapsRoutingModule } from './googlemaps-routing.module';
import { GooglemapsComponent } from './googlemaps.component';



@NgModule({
  declarations: [
    GooglemapsComponent
  ],
  imports: [
    CommonModule,
    PageTitleModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_MAPS_API_KEY,
      libraries: ['places', 'drawing', 'geometry'],
    }),
    GooglemapsRoutingModule
  ]
})
export class GooglemapsModule { }
