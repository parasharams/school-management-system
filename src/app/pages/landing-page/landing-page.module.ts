import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbAlertModule, NgbCollapseModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { LandingPageRoutingModule } from './landing-page-routing.module';
import { LandingPageComponent } from './landing-page.component';
import { TaglineComponent } from './tagline/tagline.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { LayoutsDemoComponent } from './layouts-demo/layouts-demo.component';
import { PagesDemoComponent } from './pages-demo/pages-demo.component';
import { FaqsComponent } from './faqs/faqs.component';
import { FooterComponent } from './footer/footer.component';
import { FeaturesComponent } from './features/features.component';
import { DirectionFilterPipe } from './direction-filter.pipe';



@NgModule({
  declarations: [
    LandingPageComponent,
    TaglineComponent,
    NavbarComponent,
    HeroComponent,
    LayoutsDemoComponent,
    PagesDemoComponent,
    FaqsComponent,
    FooterComponent,
    DirectionFilterPipe,
    FeaturesComponent,

  ],
  imports: [
    CommonModule,
    NgbAlertModule,
    NgbCollapseModule,
    NgbTooltipModule,
    LandingPageRoutingModule
  ],
  exports: [DirectionFilterPipe]
})
export class LandingPageModule { }
