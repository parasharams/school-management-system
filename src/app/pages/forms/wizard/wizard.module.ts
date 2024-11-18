import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { NgWizardModule } from 'ng-wizard';
import { PageTitleModule } from 'src/app/shared/page-title/page-title.module';
import { WizardRoutingModule } from './wizard-routing.module';
import { WizardComponent } from './wizard.component';


@NgModule({
  declarations: [
    WizardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbNavModule,
    NgWizardModule,
    PageTitleModule,
    WizardRoutingModule
  ]
})
export class WizardModule { }
