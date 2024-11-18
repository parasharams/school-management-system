import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.scss']
})
export class RecoverPasswordComponent implements OnInit {


  resetPassswordForm!: FormGroup;
  formSubmitted: boolean = false;
  successMessage: string = "";


  constructor (private fb: FormBuilder, private titleService: Title) {
    titleService.setTitle("Recover Password | Shreyu - Responsive Angular and Bootstrap 5 Admin Dashboard Template")
  }

  ngOnInit(): void {
    this.resetPassswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  /**
 * convenience getter for easy access to form fields
 */
  get formValues() {
    return this.resetPassswordForm.controls;
  }

  /**
   * On form submit
   */
  onSubmit(): void {
    this.formSubmitted = true;
    if (this.resetPassswordForm.valid) {
      this.successMessage = "We have sent you an email containing a link to reset your password";
    }
  }

}
