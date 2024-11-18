import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgWizardConfig, THEME } from 'ng-wizard';
import { BreadcrumbItem } from 'src/app/shared/page-title/page-title/page-title.model';

@Component({
  selector: 'app-form-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss']
})
export class WizardComponent implements OnInit {

  pageTitle: BreadcrumbItem[] = [];

  config1: NgWizardConfig = {
    theme: THEME.arrows,
  };
  config2: NgWizardConfig = {
    theme: THEME.circles,
  };
  config3: NgWizardConfig = {
    theme: THEME.dots,
  };

  formWizard1!: FormGroup;

  formWizard2 !: FormGroup;

  formWizard3 !: FormGroup;

  formWizard4!: FormGroup;


  constructor (private fb: FormBuilder) { }

  ngOnInit(): void {
    this.pageTitle = [{ label: 'Forms', path: '/' }, { label: 'Wizard', path: '/', active: true }];

    this.formWizard1 = this.fb.group({
      account: this.fb.group({
        userName: [''],
        password: [''],
        rePassword: ['']
      }),
      profile: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.email]
      }),
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.formWizard2 = this.fb.group({
      account: this.fb.group({
        userName: [''],
        password: [''],
        rePassword: ['']
      }),
      profile: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.email]
      }),
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.formWizard3 = this.fb.group({
      account: this.fb.group({
        userName: [''],
        password: [''],
        rePassword: ['']
      }),
      profile: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.email]
      }),
      acceptTerms: [false, Validators.requiredTrue]
    });

    this.formWizard4 = this.fb.group({
      account: this.fb.group({
        userName: ['shreyu'],
        password: [''],
        rePassword: ['']
      }),
      profile: this.fb.group({
        firstName: [''],
        lastName: [''],
        email: ['', Validators.email]
      }),
      acceptTerms: [false, Validators.requiredTrue]
    });
  }

}
